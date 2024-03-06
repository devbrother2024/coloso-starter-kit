'use client';

import { MouseEvent, useRef } from 'react';

import { cx } from '@emotion/css';
import { usePathname } from 'next/navigation';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import WideBanner from '@/components/layouts/curation/WideBanner';
import { TypeBanner } from '@/types/banner';
import { TypeBannerResponse, TypeCurationMeta } from '@/types/operation';

interface TypeCarouselWide {
  config: TypeBannerResponse;
}

const CarouselWide = ({ config }: TypeCarouselWide) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const indexRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperCore>();

  const pathname = usePathname();
  const isLinear = pathname.includes('/category');

  const banners: TypeBanner[] = config?.data ?? [];
  const bannerMeta: TypeCurationMeta = config?.meta ?? {};

  const publicTitle = bannerMeta?.publicTitle ?? '';
  const isPublicTitle = bannerMeta?.isPublicTitle ?? '';

  const ENABLED_SWIPER = banners.length > 1;

  const onPauseAutoplay = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (!swiperRef.current) return;
    const { autoplay } = swiperRef.current;
    const PAUSE_CLASSNAME = 'slide--pause';

    if (autoplay.running) {
      autoplay.stop();
      e.currentTarget.classList.add(PAUSE_CLASSNAME);
    } else {
      autoplay.start();
      e.currentTarget.classList.remove(PAUSE_CLASSNAME);
    }
  };

  SwiperCore.use([Pagination, Navigation, Autoplay]);

  const onBeforeInit = (swiper: SwiperCore) => {
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
    swiper.update();
  };

  const settings = {
    rewind: ENABLED_SWIPER,
    speed: 1000,
    navigation: {
      prevEl: prevRef.current,
      nextEl: nextRef.current,
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
      el: indexRef.current,
      type: 'fraction' as 'fraction',
    },
    onBeforeInit: onBeforeInit,
  };

  if (!banners.length) return null;

  return (
    <section className={cx('carousel-wide', { 'carousel-wide--linear': isLinear })}>
      <div className="grid--large">
        <div className="catalog-wrapper">
          <h2 className={isPublicTitle ? 'catalog-title' : 'a11y'}>{publicTitle}</h2>
          <div className={cx('wide__controller', { 'wide__controller--hidden': !ENABLED_SWIPER })}>
            <div className="wide__arrows">
              <button className="wide__prev" ref={prevRef}>
                <span className="a11y">previous</span>
              </button>
              <button className="wide__pause" onMouseDown={(e) => onPauseAutoplay(e)}>
                <span className="a11y">play</span>
              </button>
              <button className="wide__next" ref={nextRef}>
                <span className="a11y">next</span>
              </button>
            </div>
            <button className="wide__index" ref={indexRef} />
          </div>
          <Swiper className="wide__swiper" {...settings}>
            {banners.map((banner) => (
              <SwiperSlide key={banner.id}>
                <WideBanner banner={banner} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CarouselWide;
