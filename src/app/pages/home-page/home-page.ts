import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  ViewChild,
  inject,
  signal
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

type ApproachItem = {
  number: string;
  title: string;
  description: string;
  mediaType: 'video' | 'image';
  alt: string;
  poster?: string;
  videoMp4?: string;
  videoWebm?: string;
  imageSrc?: string;
  mobileWide?: boolean;
};

type VideoItem = {
  title: string;
  date: string;
  badge: string;
  thumbnail: string;
  youtubeUrl: string;
  embedUrl: SafeResourceUrl;
  featured?: boolean;
};

type ArticleItem = {
  category: string;
  date: string;
  title: string;
  description?: string;
  author?: string;
  cta: string;
  imageSrc: string;
  imageAlt: string;
};

type PodcastEpisode = {
  season: string;
  episode: string;
  title: string;
  date: string;
  duration: string;
};

type ServiceItem = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

type RenderedServiceItem = {
  title: string;
  loopKey: string;
  renderedIndex: number;
};

type SocialLink = {
  label: string;
  href: string;
  iconClass: string;
};

type FooterLink = {
  label: string;
  href: string;
};

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePageComponent implements AfterViewInit {
  private static readonly SERVICE_LOOP_COPIES = 5;
  private static readonly SERVICE_SCROLL_SPEED_PX = 42;

  private readonly destroyRef = inject(DestroyRef);
  private readonly sanitizer = inject(DomSanitizer);
  private playbackIntervalId: number | null = null;
  private serviceAnimationFrameId: number | null = null;
  private serviceLastFrameTime = 0;
  private serviceProgressPx = 0;
  private serviceRowHeight = 0;
  private serviceViewportHeight = 0;
  private serviceBlockHeight = 0;
  private serviceBaseOffsetPx = 0;
  private serviceResizeObserver: ResizeObserver | null = null;

  @ViewChild('approachVideo')
  protected approachVideo?: ElementRef<HTMLVideoElement>;

  @ViewChild('servicesMarqueeViewport')
  protected servicesMarqueeViewport?: ElementRef<HTMLDivElement>;

  protected readonly isApproachVideoPaused = signal(false);
  protected readonly activePodcastEpisode = signal<PodcastEpisode | null>(null);
  protected readonly podcastPlaybackPosition = signal(0);
  protected readonly isPodcastPlaying = signal(false);
  protected readonly activeRenderedServiceIndex = signal(0);
  protected readonly serviceMarqueeTranslateY = signal(0);

  protected readonly heroSocialLinks: SocialLink[] = [
    { label: 'Instagram', href: 'https://instagram.com/kas_crpa', iconClass: 'bi bi-instagram' },
    { label: 'Facebook', href: 'https://facebook.com/kascostaricapanama', iconClass: 'bi bi-facebook' },
    { label: 'X', href: 'https://x.com/kas_crpa', iconClass: 'bi bi-twitter-x' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/kas-costarica', iconClass: 'bi bi-linkedin' },
    { label: 'YouTube', href: 'https://youtube.com/channel/UCtml2Y6atm9OJ9M-AoeSRrA', iconClass: 'bi bi-youtube' }
  ];

  protected readonly footerSocialLinks = this.heroSocialLinks;

  protected readonly footerPrimaryLinks: FooterLink[] = [
    { label: 'Podcast', href: '#podcast' },
    { label: 'Videos', href: '#videos' },
    { label: 'Artículos', href: '#articulos' }
  ];

  protected readonly footerTopicLinks: FooterLink[] = [
    { label: 'Representación', href: '#temas' },
    { label: 'Participación', href: '#temas' },
    { label: 'Innovación', href: '#temas' },
    { label: 'Seguridad', href: '#temas' }
  ];

  protected readonly footerInstitutionalLinks: FooterLink[] = [
    { label: 'Sobre nosotros', href: '#nosotros' },
    { label: 'Campus KAS', href: '#campus' },
    { label: 'Contáctenos', href: '#contacto' }
  ];

  protected readonly approachItems: ApproachItem[] = [
    {
      number: '01',
      title: 'Videos',
      description:
        'Una selección audiovisual para comunicar ideas complejas con claridad, contexto y una narrativa más accesible.',
      mediaType: 'image',
      alt: 'Videos category cover',
      imageSrc: '/video.png'
    },
    {
      number: '02',
      title: 'Podcast',
      description:
        'Conversaciones y análisis para profundizar en democracia, representación y los retos del presente con voces expertas.',
      alt: 'Podcast category cover',
      imageSrc: '/poscast',
      mediaType: 'image'
    },
    {
      number: '03',
      title: 'Artículos',
      description:
        'Textos, análisis y publicaciones para profundizar en temas estratégicos con una lectura más editorial y reflexiva.',
      mediaType: 'image',
      alt: 'Articles category cover',
      imageSrc: '/article',
      mobileWide: true
    }
  ];

  protected readonly videoItems: VideoItem[] = [
    {
      title: 'EP023 Desafíos democráticos de las elecciones 2026',
      date: '30 de octubre, 2025',
      badge: 'Representación',
      thumbnail: 'https://img.youtube.com/vi/kXA8HianxAE/maxresdefault.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=kXA8HianxAE',
      embedUrl: this.createVideoEmbed(
        'https://www.youtube.com/embed/kXA8HianxAE?controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3'
      ),
      featured: true
    },
    {
      title: '¿Cooperación o supervivencia? Centroamérica frente al mundo fragmentado',
      date: '1 de octubre, 2025',
      badge: 'Seguridad',
      thumbnail: 'https://img.youtube.com/vi/vjBUof72MTY/maxresdefault.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=vjBUof72MTY',
      embedUrl: this.createVideoEmbed(
        'https://www.youtube.com/embed/vjBUof72MTY?controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3'
      )
    },
    {
      title: 'Retos e impactos del cambio global en Costa Rica',
      date: '17 de diciembre, 2024',
      badge: 'Innovación',
      thumbnail: 'https://img.youtube.com/vi/LqVno3CDp6U/maxresdefault.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=LqVno3CDp6U',
      embedUrl: this.createVideoEmbed(
        'https://www.youtube.com/embed/LqVno3CDp6U?controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3'
      )
    },
    {
      title: 'Entrevista a Miguel Ángel Rodríguez sobre su nuevo libro "Vida y Legado"',
      date: '6 de septiembre, 2024',
      badge: 'Representación',
      thumbnail: 'https://img.youtube.com/vi/NzAsaL1pKRQ/maxresdefault.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=NzAsaL1pKRQ',
      embedUrl: this.createVideoEmbed(
        'https://www.youtube.com/embed/NzAsaL1pKRQ?controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3'
      )
    }
  ];

  protected readonly heroFeaturedVideo = this.videoItems[1];

  protected readonly articleItems: ArticleItem[] = [
    {
      category: 'Representación',
      date: '30 de octubre, 2025',
      title: 'Elecciones 2026: el desafío democrático de recuperar la fe en el voto',
      description:
        'Costa Rica llega a las elecciones del 2026 con su democracia en riesgo. No por un enemigo externo, sino por el creciente silencio de sus propios ciudadanos.',
      author: 'Cynthia Briceño, periodista',
      cta: 'Leer artículo',
      imageSrc: '/a1.png',
      imageAlt: 'Imagen del artículo sobre elecciones 2026'
    },
    {
      category: 'Educación',
      date: '1 de octubre, 2025',
      title: 'Educación en crisis, democracia debilitada',
      description:
        'La educación costarricense fue durante décadas el motor de movilidad social y cohesión. Hoy, sin embargo, ese pilar se tambalea.',
      author: 'Cynthia Briceño, periodista',
      cta: 'Leer artículo',
      imageSrc: '/a2.png',
      imageAlt: 'Imagen del artículo sobre educación en crisis'
    },
    {
      category: 'Seguridad',
      date: '16 de septiembre, 2025',
      title: 'Centroamérica: Migración forzada en un corredor desbordado y sin recursos',
      description:
        'Centroamérica es hoy el corredor migratorio más dinámico del hemisferio, pero sus Estados desbordados, la falta de cooperación y el debilitamiento institucional convierten la migración forzada en una prueba crítica para la democracia regional.',
      author: 'Cynthia Briceño, periodista',
      cta: 'Leer artículo',
      imageSrc: '/a3.png',
      imageAlt: 'Imagen del artículo sobre migración forzada en Centroamérica'
    },
    {
      category: 'Seguridad',
      date: '1 de agosto, 2025',
      title: 'Seguridad y Democracia',
      description:
        'La expresidenta Laura Chinchilla alertó sobre los riesgos que enfrenta la democracia costarricense ante el avance del crimen organizado y el deterioro institucional.',
      author: 'Cynthia Briceño, periodista',
      cta: 'Leer artículo',
      imageSrc: '/a4.png',
      imageAlt: 'Imagen del artículo sobre seguridad y democracia'
    }
  ];

  protected readonly podcastEpisodes: PodcastEpisode[] = [
    {
      season: 'Temporada 3',
      episode: 'EP23',
      title: 'Desafíos democráticos de las elecciones 2026',
      date: '30 de octubre, 2025',
      duration: '34 min'
    },
    {
      season: 'Temporada 3',
      episode: 'EP22',
      title: 'Estado de la Educación: señales de alerta para la democracia',
      date: '1 de octubre, 2025',
      duration: '28 min'
    },
    {
      season: 'Temporada 3',
      episode: 'EP21',
      title: 'Migración, seguridad y democracia',
      date: '16 de septiembre, 2025',
      duration: '39 min'
    },
    {
      season: 'Temporada 3',
      episode: 'EP20',
      title: 'Seguridad, Estado de derecho y cohesión social: claves para enfrentar el crimen organizado',
      date: '28 de julio, 2025',
      duration: '18 min'
    },
    {
      season: 'Temporada 3',
      episode: 'EP19',
      title: '¿Cooperación o supervivencia? Centroamérica frente al mundo fragmentado',
      date: '27 de junio, 2025',
      duration: '32 min'
    },
    {
      season: 'Temporada 3',
      episode: 'EP18',
      title: 'Ciudades Sostenibles',
      date: '30 de mayo, 2025',
      duration: '13 min'
    }
  ];

  protected readonly serviceItems: ServiceItem[] = [
    {
      title: 'Representación',
      description:
        'Democracia, partidos políticos, educación cívica y participación ciudadana.',
      imageSrc: '/people.jpg',
      imageAlt: 'Personas reunidas en un espacio colaborativo.'
    },
    {
      title: 'Innovación',
      description:
        'Economía sostenible, digitalización, ciudades inteligentes y nuevos modelos de desarrollo.',
      imageSrc: '/nordic/services/services-design.webp',
      imageAlt: 'Large monitor mockup showing a minimal website interface.'
    },
    {
      title: 'Participación',
      description:
        'Participación ciudadana, liderazgo joven y fortalecimiento de la cultura democrática.',
      imageSrc: '/nordic/services/services-content.webp',
      imageAlt: 'Hands holding a printed layout with editorial design elements.'
    },
    {
      title: 'Seguridad',
      description:
        'Estado de derecho, geopolítica, migración y lucha contra el crimen organizado.',
      imageSrc: '/nordic/services/services-strategy.webp',
      imageAlt: 'Two people in discussion during a strategic planning session.'
    }
  ];

  protected readonly renderedServiceItems: RenderedServiceItem[] = Array.from(
    { length: HomePageComponent.SERVICE_LOOP_COPIES },
    (_, copyIndex) =>
      this.serviceItems.map((item, itemIndex) => ({
        title: item.title,
        renderedIndex: copyIndex * this.serviceItems.length + itemIndex,
        loopKey: `${item.title}-${copyIndex}-${itemIndex}`
      }))
  ).flat();

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.stopPodcastPlaybackLoop();
      this.stopServiceLoop();
      this.serviceResizeObserver?.disconnect();
    });
  }

  ngAfterViewInit(): void {
    this.measureServiceMarquee();
    this.startServiceLoop();
    this.startServiceResizeObserver();
  }

  protected toggleApproachVideo(): void {
    const video = this.approachVideo?.nativeElement;

    if (!video) {
      return;
    }

    if (video.paused) {
      void video.play();
      this.isApproachVideoPaused.set(false);
      return;
    }

    video.pause();
    this.isApproachVideoPaused.set(true);
  }

  protected truncateText(text: string | undefined, maxLength = 150): string {
    if (!text) {
      return '';
    }

    if (text.length <= maxLength) {
      return text;
    }

    return `${text.slice(0, maxLength).trimEnd()}...`;
  }

  protected togglePodcastPreview(episode: PodcastEpisode): void {
    const activeEpisode = this.activePodcastEpisode();

    if (activeEpisode?.episode === episode.episode) {
      this.closePodcastPreview();
      return;
    }

    this.activePodcastEpisode.set(episode);
    this.podcastPlaybackPosition.set(0);
    this.isPodcastPlaying.set(true);
    this.startPodcastPlaybackLoop();
  }

  protected closePodcastPreview(): void {
    this.activePodcastEpisode.set(null);
    this.podcastPlaybackPosition.set(0);
    this.isPodcastPlaying.set(false);
    this.stopPodcastPlaybackLoop();
  }

  protected togglePodcastPlayback(): void {
    if (!this.activePodcastEpisode()) {
      return;
    }

    const nextPlaying = !this.isPodcastPlaying();
    this.isPodcastPlaying.set(nextPlaying);

    if (nextPlaying) {
      this.startPodcastPlaybackLoop();
      return;
    }

    this.stopPodcastPlaybackLoop();
  }

  protected updatePodcastProgress(event: Event): void {
    const target = event.target as HTMLInputElement | null;

    if (!target) {
      return;
    }

    this.podcastPlaybackPosition.set(Number(target.value));
  }

  protected formatPodcastCurrentTime(position: number): string {
    const currentMinutes = Math.max(0, Math.floor(position / 60));

    return `${String(currentMinutes).padStart(2, '0')} min`;
  }

  protected getPodcastDurationSeconds(duration: string): number {
    return this.extractDurationMinutes(duration) * 60;
  }

  protected getPodcastProgressPercent(duration: string): number {
    const totalSeconds = this.getPodcastDurationSeconds(duration);

    if (totalSeconds <= 0) {
      return 0;
    }

    return Math.min(100, (this.podcastPlaybackPosition() / totalSeconds) * 100);
  }

  private createVideoEmbed(url: string): SafeResourceUrl {
    const videoId = this.extractVideoId(url);
    const separator = url.includes('?') ? '&' : '?';
    const autoplayUrl = `${url}${separator}autoplay=1&mute=1&loop=1&playlist=${videoId}`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(autoplayUrl);
  }

  private extractVideoId(url: string): string {
    const match = url.match(/embed\/([^?&/]+)/);

    return match?.[1] ?? '';
  }

  private extractDurationMinutes(duration: string): number {
    const match = duration.match(/(\d+)/);

    return Number(match?.[1] ?? 0);
  }

  private startPodcastPlaybackLoop(): void {
    this.stopPodcastPlaybackLoop();

    this.playbackIntervalId = window.setInterval(() => {
      if (!this.isPodcastPlaying()) {
        return;
      }

      const activeEpisode = this.activePodcastEpisode();

      if (!activeEpisode) {
        return;
      }

      const totalSeconds = this.getPodcastDurationSeconds(activeEpisode.duration);
      const nextProgress = this.podcastPlaybackPosition() + 6;

      if (nextProgress >= totalSeconds) {
        this.podcastPlaybackPosition.set(totalSeconds);
        this.isPodcastPlaying.set(false);
        this.stopPodcastPlaybackLoop();
        return;
      }

      this.podcastPlaybackPosition.set(nextProgress);
    }, 180);
  }

  private stopPodcastPlaybackLoop(): void {
    if (this.playbackIntervalId === null) {
      return;
    }

    window.clearInterval(this.playbackIntervalId);
    this.playbackIntervalId = null;
  }

  private startServiceLoop(): void {
    this.stopServiceLoop();

    const animate = (now: number) => {
      if (this.serviceLastFrameTime === 0) {
        this.serviceLastFrameTime = now;
      }

      const deltaTime = now - this.serviceLastFrameTime;
      this.serviceLastFrameTime = now;
      this.updateServiceMarquee(deltaTime);
      this.serviceAnimationFrameId = window.requestAnimationFrame(animate);
    };

    this.serviceAnimationFrameId = window.requestAnimationFrame(animate);
  }

  private stopServiceLoop(): void {
    if (this.serviceAnimationFrameId === null) {
      return;
    }

    window.cancelAnimationFrame(this.serviceAnimationFrameId);
    this.serviceAnimationFrameId = null;
    this.serviceLastFrameTime = 0;
  }

  private startServiceResizeObserver(): void {
    const viewport = this.servicesMarqueeViewport?.nativeElement;

    if (!viewport || typeof ResizeObserver === 'undefined') {
      return;
    }

    this.serviceResizeObserver = new ResizeObserver(() => {
      this.measureServiceMarquee();
    });

    this.serviceResizeObserver.observe(viewport);

    const firstItem = viewport.querySelector('.services-item');

    if (firstItem) {
      this.serviceResizeObserver.observe(firstItem);
    }
  }

  private measureServiceMarquee(): void {
    const viewport = this.servicesMarqueeViewport?.nativeElement;
    const firstItem = viewport?.querySelector<HTMLElement>('.services-item');

    if (!viewport || !firstItem) {
      return;
    }

    this.serviceRowHeight = firstItem.getBoundingClientRect().height;
    this.serviceViewportHeight = viewport.getBoundingClientRect().height;
    this.serviceBlockHeight = this.serviceRowHeight * this.serviceItems.length;
    this.serviceBaseOffsetPx =
      Math.floor(HomePageComponent.SERVICE_LOOP_COPIES / 2) * this.serviceBlockHeight;

    if (this.serviceBlockHeight > 0) {
      this.serviceProgressPx %= this.serviceBlockHeight;
    }

    this.applyServiceMarqueeState();
  }

  private updateServiceMarquee(deltaTime: number): void {
    if (!this.serviceBlockHeight || !this.serviceRowHeight || !this.serviceViewportHeight) {
      return;
    }

    const deltaPx = (deltaTime / 1000) * HomePageComponent.SERVICE_SCROLL_SPEED_PX;
    this.serviceProgressPx = (this.serviceProgressPx + deltaPx) % this.serviceBlockHeight;
    this.applyServiceMarqueeState();
  }

  private applyServiceMarqueeState(): void {
    if (!this.serviceBlockHeight || !this.serviceRowHeight || !this.serviceViewportHeight) {
      return;
    }

    const translateY = this.serviceBaseOffsetPx + this.serviceProgressPx;
    const centerLine = translateY + this.serviceViewportHeight / 2;
    const closestIndex = Math.round((centerLine - this.serviceRowHeight / 2) / this.serviceRowHeight);
    const maxIndex = this.renderedServiceItems.length - 1;

    this.serviceMarqueeTranslateY.set(translateY);
    this.activeRenderedServiceIndex.set(Math.min(Math.max(closestIndex, 0), maxIndex));
  }
}
