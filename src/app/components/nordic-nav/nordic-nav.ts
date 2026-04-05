import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, HostListener, inject, signal } from '@angular/core';
import { CrmTrackingService } from '../../services/crm-tracking.service';

type NavLink = {
  label: string;
  path: string;
  pageCount?: string;
};

type SocialLink = {
  label: string;
  href: string;
  iconClass: string;
};

type MenuCase = {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
};

type MenuCategory = {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
};

type MenuArticle = {
  title: string;
  imageSrc: string;
  href: string;
};

type MenuTopicGroup = {
  title: string;
  tags: string[];
};

@Component({
  selector: 'app-nordic-nav',
  templateUrl: './nordic-nav.html',
  styleUrl: './nordic-nav.scss'
})
export class NordicNavComponent {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly tracking = inject(CrmTrackingService);
  private blogAutoplayIntervalId: number | null = null;

  protected readonly isMenuOpen = signal(false);
  protected readonly activeArticleIndex = signal(0);

  protected readonly navLinks: NavLink[] = [
    { label: 'Videos', path: '#videos' },
    { label: 'Podcast', path: '#podcast' },
    { label: 'Artículos', path: '#articulos' },
    { label: 'Temas', path: '#temas' },
    { label: 'Nosotros', path: '#nosotros' }
  ];

  protected readonly socialLinks: SocialLink[] = [
    { label: 'Instagram', href: 'https://instagram.com/kas_crpa', iconClass: 'bi bi-instagram' },
    { label: 'Facebook', href: 'https://facebook.com/kascostaricapanama', iconClass: 'bi bi-facebook' },
    { label: 'X', href: 'https://x.com/kas_crpa', iconClass: 'bi bi-twitter-x' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/kas-costarica', iconClass: 'bi bi-linkedin' },
    { label: 'YouTube', href: 'https://youtube.com/channel/UCtml2Y6atm9OJ9M-AoeSRrA', iconClass: 'bi bi-youtube' }
  ];

  protected readonly menuCategories: MenuCategory[] = [
    {
      title: 'Videos',
      description: 'Narrativas audiovisuales para explicar ideas complejas con claridad.',
      imageSrc: '/video.png',
      href: '#videos'
    },
    {
      title: 'Podcast',
      description: 'Conversaciones y análisis para profundizar en democracia y representación.',
      imageSrc: '/poscast',
      href: '#podcast'
    },
    {
      title: 'Artículos',
      description: 'Textos editoriales y análisis para profundizar en temas estratégicos.',
      imageSrc: '/article',
      href: '#articulos'
    }
  ];

  protected readonly menuArticles: MenuArticle[] = [
    {
      title: 'Resilience in Focus: Capturing grit for a winter brand',
      imageSrc: '/nordic/nav/blog-resilience.webp',
      href: '/blog-posts/capturing-grit-for-a-winter-brand'
    },
    {
      title: 'Beyond Reality: Designing with digital light and texture',
      imageSrc: '/nordic/nav/blog-light.webp',
      href: '/blog-posts/designing-with-digital-light-and-texture'
    },
    {
      title: 'Breaking Perspective: The power of fashion photography',
      imageSrc: '/nordic/nav/blog-fashion.webp',
      href: '/blog-posts/the-power-of-low-angle-fashion-photography'
    }
  ];

  protected readonly menuTopicGroups: MenuTopicGroup[] = [
    {
      title: 'Representación y Participación',
      tags: ['Brecha social', 'Democracia', 'Educación', 'Integración', 'Partidos políticos', 'Pobreza']
    },
    {
      title: 'Innovación',
      tags: [
        'Comercio e integración',
        'Digitalización e Inteligencia artificial',
        'Economía y productividad',
        'Futuro del trabajo',
        'Movilidad inteligente y Ciudades',
        'Sostenibilidad y Nuevas innovaciones'
      ]
    },
    {
      title: 'Seguridad',
      tags: [
        'Ciberseguridad',
        'Corrupción',
        'Geopolítica',
        'Migración y Control de fronteras',
        'Narcotráfico',
        'Seguridad ciudadana'
      ]
    }
  ];

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.stopBlogAutoplay();
      this.unlockBodyScroll();
    });
  }

  @HostListener('document:keydown.escape')
  protected handleEscape(): void {
    if (this.isMenuOpen()) {
      this.closeMenu();
    }
  }

  @HostListener('window:resize')
  protected handleResize(): void {
    if (this.isMenuOpen()) {
      this.closeMenu();
    }
  }

  protected toggleMenu(): void {
    if (this.isMenuOpen()) {
      this.closeMenu();
    } else {
      this.tracking.trackCTA('Abrir menu');
      this.openMenu();
    }
  }

  protected openMenu(): void {
    this.isMenuOpen.set(true);
    this.lockBodyScroll();
    this.startBlogAutoplay();
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
    this.stopBlogAutoplay();
    this.unlockBodyScroll();
  }

  protected handleInternalNavigation(event: Event, label?: string): void {
    event.preventDefault();
    const target = event.currentTarget as HTMLAnchorElement | null;
    const href = target?.getAttribute('href') ?? '';
    const win = this.document.defaultView;

    if (label) {
      this.tracking.trackCTA(label);
    }

    this.closeMenu();

    if (href === '/') {
      this.lastScrollToTop(win);
      return;
    }

    if (!href.startsWith('#')) {
      return;
    }

    const section = this.document.querySelector<HTMLElement>(href);

    if (!section) {
      return;
    }

    requestAnimationFrame(() => {
      if (win && win.location.hash !== href) {
        win.location.hash = href;
        return;
      }

      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  private lastScrollToTop(win: Window | null): void {
    if (!win) {
      return;
    }

    if (win.location.pathname !== '/') {
      win.history.pushState({}, '', '/');
    }

    win.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected showArticle(index: number): void {
    this.activeArticleIndex.set(index);
  }

  private startBlogAutoplay(): void {
    if (this.blogAutoplayIntervalId !== null) {
      return;
    }

    this.blogAutoplayIntervalId = window.setInterval(() => {
      this.activeArticleIndex.update((current) => (current + 1) % this.menuArticles.length);
    }, 3000);
  }

  private stopBlogAutoplay(): void {
    if (this.blogAutoplayIntervalId === null) {
      return;
    }

    window.clearInterval(this.blogAutoplayIntervalId);
    this.blogAutoplayIntervalId = null;
  }

  private lockBodyScroll(): void {
    this.document.body.classList.add('nav-menu-open');
  }

  private unlockBodyScroll(): void {
    this.document.body.classList.remove('nav-menu-open');
  }
}
