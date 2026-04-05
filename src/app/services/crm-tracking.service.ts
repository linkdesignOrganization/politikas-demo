import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { environment } from '../../environments/environment';

type TrackingEvent = {
  source: 'landing';
  eventType: 'open' | 'cta-click' | 'scroll' | 'time' | 'custom';
  metadata: Record<string, unknown>;
  timestamp: string;
};

type TrackingPayload = {
  leadId: string;
  events: TrackingEvent[];
};

@Injectable({ providedIn: 'root' })
export class CrmTrackingService {
  private static readonly BATCH_INTERVAL_MS = 10_000;
  private static readonly HEARTBEAT_INTERVAL_MS = 30_000;
  private static readonly MAX_CUSTOM_EVENT_NAME_LENGTH = 100;
  private static readonly MAX_CUSTOM_FIELDS = 10;

  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly endpoint = environment.crmTrackingEndpoint;
  private readonly leadId = environment.crmLeadId;

  private readonly queuedEvents: TrackingEvent[] = [];
  private readonly reportedScrollThresholds = new Set<number>();

  private initialized = false;
  private batchIntervalId: number | null = null;
  private heartbeatIntervalId: number | null = null;
  private lastTrackedRoute: string | null = null;

  init(): void {
    if (this.initialized) {
      return;
    }

    this.initialized = true;

    if (!this.endpoint || !this.leadId) {
      console.warn('[CRM tracking] Missing endpoint or lead id. Tracking disabled.');
      return;
    }

    this.trackOpen();
    this.trackPageView();
    this.startBatchLoop();
    this.attachRouteTracking();
    this.attachHashTracking();
    this.attachScrollTracking();
    this.attachVisibilityTracking();
    this.attachBeforeUnloadTracking();
    this.syncHeartbeatWithVisibility();
  }

  trackCTA(label: string): void {
    if (!label.trim()) {
      return;
    }

    this.enqueueEvent('cta-click', { label });
  }

  trackCustom(eventName: string, data: Record<string, unknown> = {}): void {
    const trimmedName = eventName.trim().slice(0, CrmTrackingService.MAX_CUSTOM_EVENT_NAME_LENGTH);

    if (!trimmedName) {
      return;
    }

    this.enqueueEvent('custom', {
      customEventName: trimmedName,
      customEventData: this.sanitizeCustomEventData(data)
    });
  }

  private trackOpen(): void {
    this.enqueueEvent('open', {});
  }

  private trackScrollDepth(): void {
    const win = this.document.defaultView;

    if (!win) {
      return;
    }

    const scrollElement = this.document.documentElement;
    const scrollTop = win.scrollY || scrollElement.scrollTop || 0;
    const scrollHeight = scrollElement.scrollHeight;
    const clientHeight = win.innerHeight || scrollElement.clientHeight || 0;
    const maxScrollable = scrollHeight - clientHeight;

    if (maxScrollable <= 0) {
      return;
    }

    const percent = Math.min(100, Math.floor((scrollTop / maxScrollable) * 100));
    const threshold = Math.floor(percent / 10) * 10;

    if (threshold < 10) {
      return;
    }

    for (let current = 10; current <= threshold; current += 10) {
      if (this.reportedScrollThresholds.has(current)) {
        continue;
      }

      this.reportedScrollThresholds.add(current);
      this.enqueueEvent('scroll', { percent: current });
    }
  }

  private trackPageView(): void {
    const route = this.getCurrentRoute();

    if (!route || route === this.lastTrackedRoute) {
      return;
    }

    this.lastTrackedRoute = route;
    this.trackCustom('page-view', { route });
    this.resetScrollTracking();
  }

  private attachRouteTracking(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.trackPageView();
      });
  }

  private attachHashTracking(): void {
    const win = this.document.defaultView;

    if (!win) {
      return;
    }

    win.addEventListener('hashchange', () => {
      this.trackPageView();
    });
  }

  private attachScrollTracking(): void {
    const win = this.document.defaultView;

    if (!win) {
      return;
    }

    win.addEventListener(
      'scroll',
      () => {
        this.trackScrollDepth();
      },
      { passive: true }
    );
  }

  private attachVisibilityTracking(): void {
    this.document.addEventListener('visibilitychange', () => {
      if (this.document.hidden) {
        this.stopHeartbeat();
        this.flush();
        return;
      }

      this.syncHeartbeatWithVisibility();
      this.trackPageView();
    });
  }

  private attachBeforeUnloadTracking(): void {
    const win = this.document.defaultView;

    if (!win) {
      return;
    }

    win.addEventListener('beforeunload', () => {
      this.flush();
    });
  }

  private startBatchLoop(): void {
    if (this.batchIntervalId !== null) {
      return;
    }

    this.batchIntervalId = window.setInterval(() => {
      this.flush();
    }, CrmTrackingService.BATCH_INTERVAL_MS);
  }

  private syncHeartbeatWithVisibility(): void {
    if (this.document.visibilityState !== 'visible') {
      this.stopHeartbeat();
      return;
    }

    if (this.heartbeatIntervalId !== null) {
      return;
    }

    this.heartbeatIntervalId = window.setInterval(() => {
      if (this.document.visibilityState !== 'visible') {
        return;
      }

      this.enqueueEvent('time', { duration: 30 });
    }, CrmTrackingService.HEARTBEAT_INTERVAL_MS);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatIntervalId === null) {
      return;
    }

    window.clearInterval(this.heartbeatIntervalId);
    this.heartbeatIntervalId = null;
  }

  private resetScrollTracking(): void {
    this.reportedScrollThresholds.clear();
  }

  private enqueueEvent(
    eventType: TrackingEvent['eventType'],
    metadata: Record<string, unknown>
  ): void {
    this.queuedEvents.push({
      source: 'landing',
      eventType,
      metadata,
      timestamp: new Date().toISOString()
    });
  }

  private flush(): void {
    if (!this.queuedEvents.length) {
      return;
    }

    const payload: TrackingPayload = {
      leadId: this.leadId,
      events: this.queuedEvents.splice(0, this.queuedEvents.length)
    };

    const body = JSON.stringify(payload);

    try {
      const beaconSent = this.sendWithBeacon(body);

      if (beaconSent) {
        return;
      }

      void fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body,
        keepalive: true
      }).catch((error) => {
        console.warn('[CRM tracking] Failed to send events.', error);
      });
    } catch (error) {
      console.warn('[CRM tracking] Failed to flush events.', error);
    }
  }

  private sendWithBeacon(body: string): boolean {
    const win = this.document.defaultView;

    if (!win?.navigator?.sendBeacon) {
      return false;
    }

    return win.navigator.sendBeacon(
      this.endpoint,
      new Blob([body], { type: 'application/json' })
    );
  }

  private sanitizeCustomEventData(data: Record<string, unknown>): Record<string, unknown> {
    return Object.fromEntries(
      Object.entries(data).slice(0, CrmTrackingService.MAX_CUSTOM_FIELDS)
    );
  }

  private getCurrentRoute(): string {
    const win = this.document.defaultView;

    if (!win) {
      return '/';
    }

    const { pathname, search, hash } = win.location;
    const route = `${pathname || '/'}${search || ''}${hash || ''}`;

    return route || '/';
  }
}
