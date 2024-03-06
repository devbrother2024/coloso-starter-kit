'use client';

import { MouseEvent, useRef } from 'react';

import { cx } from '@emotion/css';
import SwiperCore, { EffectCreative, Pagination, Navigation, Autoplay, Parallax } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { IconArrowSquareRightSmall } from '@/assets/icons';
import HeroBanner from '@/components/layouts/curation/HeroBanner';
import { TypeBanner } from '@/types/banner';
import { TypeBannerResponse, TypeCurationMeta } from '@/types/operation';

interface TypeCarouselHero {
  config: TypeBannerResponse;
}

const TIME_SWIPE_DELAY = 4000;
const TIME_SWIPE_SPEED = 600;
const ACTIVE_PROGRESS = 'hero__progress--active';
const PAUSED_PROGRESS = 'hero__progress--pause';

const CarouselHero = ({ config }: TypeCarouselHero) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const indexRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLElement>(null);
  const swiperRef = useRef<SwiperCore>();

  const curationList: TypeBanner[] = config?.data ?? [];
  const curationMeta: TypeCurationMeta = config?.meta ?? {};

  const onPauseAutoplay = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (!swiperRef.current || !progressRef.current) return;

    const { classList } = progressRef.current;
    const { paused: isPaused, pause, stop, start, resume, running: isRunning, timeLeft } = swiperRef.current.autoplay;
    const isHovered = event.type === 'mouseenter';
    const isSliding = timeLeft === TIME_SWIPE_DELAY && isPaused && isHovered;

    if (!isRunning) {
      classList.add(ACTIVE_PROGRESS);
      classList.remove(PAUSED_PROGRESS);
      return start();
    }

    if (isSliding) {
      classList.add(PAUSED_PROGRESS);
      return stop();
    }

    if (isPaused) {
      classList.remove(PAUSED_PROGRESS);
      return resume();
    }

    if (isHovered) {
      classList.add(PAUSED_PROGRESS);
      return pause();
    }
  };

  const ENABLED_SWIPER = curationList.length > 1;

  SwiperCore.use([Pagination, Navigation, EffectCreative, Autoplay, Parallax]);

  const settings = {
    rewind: ENABLED_SWIPER,
    speed: TIME_SWIPE_SPEED,
    effect: 'creative' as 'creative',
    creativeEffect: {
      prev: {
        shadow: true,
        translate: ['0%', 0, 0],
      },
      next: {
        translate: ['0%', 0, 0],
      },
    },
    navigation: {
      prevEl: prevRef.current,
      nextEl: nextRef.current,
    },
    autoplay: {
      delay: TIME_SWIPE_DELAY,
      disableOnInteraction: false,
    },
    pagination: {
      el: indexRef.current,
      type: 'fraction' as 'fraction',
    },
    parallax: true,
    onBeforeInit: (swiper: SwiperCore) => {
      if (typeof swiper.params.pagination === 'boolean') return;
      if (typeof swiper.params.navigation === 'boolean') return;

      if (swiper.params.pagination) {
        swiper.params.pagination.el = indexRef.current;
      }

      if (swiper.params.navigation) {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
      }

      swiperRef.current = swiper;
      swiper.navigation.update();
      swiper.pagination.update();
    },
    onTransitionStart: () => {
      progressRef.current?.classList.remove(ACTIVE_PROGRESS);
    },
    onTransitionEnd: (swiper: SwiperCore) => {
      // NOTE: 기기 화면 전환 시, 임의 정지된 슬라이드 초기화
      if (swiper.autoplay.running && swiper.autoplay.paused) {
        progressRef.current?.classList.remove(ACTIVE_PROGRESS);
        swiper.autoplay.resume();
      }
    },
    onAutoplayPause: (swiper: SwiperCore) => {
      const hasPauseState = progressRef.current?.classList.contains(PAUSED_PROGRESS);

      // NOTE: 브라우저 감지 시, 임의 정지된 슬라이드 초기화
      if (!hasPauseState) {
        progressRef.current?.classList.remove(ACTIVE_PROGRESS);
        swiper.autoplay.stop();
        swiper.autoplay.start();
      }
    },
    onAutoplayResume: () => {
      requestAnimationFrame(() => {
        progressRef.current?.classList.add(ACTIVE_PROGRESS);
        progressRef.current?.classList.remove(PAUSED_PROGRESS);
      });
    },
  };

  return (
    <section className="hero__wrapper" onMouseEnter={onPauseAutoplay} onMouseLeave={onPauseAutoplay}>
      <h2 className={cx({ a11y: !curationMeta.isPublicTitle })}>{curationMeta.publicTitle}</h2>
      {ENABLED_SWIPER && (
        <aside className="hero__controller">
          <span className="hero__progress hero__progress--active" ref={progressRef} />
          <button className="hero__prev" ref={prevRef}>
            <span className="a11y">previous</span>
            <IconArrowSquareRightSmall className="icon icon--prev" />
          </button>
          <span className="hero__index" ref={indexRef} />
          <button className="hero__next" ref={nextRef}>
            <span className="a11y">next</span>
            <IconArrowSquareRightSmall className="icon icon--next" />
          </button>
        </aside>
      )}
      <Swiper className="hero" {...settings}>
        {curationList.map((curation) => (
          <SwiperSlide key={curation.id}>
            <HeroBanner curation={curation} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CarouselHero;
