'use client';

import { useRef } from 'react';

import { cx } from '@emotion/css';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { IconArrowSquareRight } from '@/assets/icons';
import CardBanner from '@/components/layouts/curation/CardBanner';
import { TypeCatalogResponse } from '@/types/operation';

interface TypeCarouselCard {
  config: TypeCatalogResponse;
}

const CarouselCard = ({ config }: TypeCarouselCard) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const { data: catalogs, meta: catalogMeta } = config;
  const { publicTitle, isLightTheme } = catalogMeta;

  const ENABLED_SWIPER = catalogs.length > 3;

  SwiperCore.use([Navigation]);

  const settings = {
    breakpoints: {
      0: {
        slidesOffsetBefore: 20,
        slidesOffsetAfter: 20,
        spaceBetween: 16,
        slidesPerView: 1.7,
      },
      720: {
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        spaceBetween: 16,
        slidesPerView: 3,
      },
      960: {
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        spaceBetween: 32,
        slidesPerView: 3,
      },
    },
    speed: 800,
    navigation: {
      prevEl: prevRef.current,
      nextEl: nextRef.current,
    },
    onBeforeInit: (swiper: SwiperCore) => {
      if (typeof swiper.params.navigation === 'boolean') return;

      if (swiper.params.navigation) {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
      }

      swiper.navigation.update();
    },
  };

  if (!catalogs.length) return null;

  return (
    <section className={cx('carousel-card', { 'light-theme': isLightTheme })}>
      <div className="grid--large">
        <div className="catalog-wrapper">
          <h2 className="catalog-title">{publicTitle}</h2>
          {ENABLED_SWIPER && (
            <div className="carousel-card__controller">
              <div className="carousel-card__arrows">
                <button className="carousel-card__prev" ref={prevRef}>
                  <span className="a11y">previous</span>
                  <IconArrowSquareRight />
                </button>
                <button className="carousel-card__next" ref={nextRef}>
                  <span className="a11y">next</span>
                  <IconArrowSquareRight />
                </button>
              </div>
            </div>
          )}
          <Swiper className="carousel-card__swiper" {...settings}>
            {catalogs.map((catalog) => (
              <SwiperSlide key={catalog.id}>
                <CardBanner key={catalog.id} catalog={catalog} isLightTheme={isLightTheme ?? false} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CarouselCard;
