'use client';

import { useRef } from 'react';

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { IconArrowSquareRight, IconArrowTail } from '@/assets/icons';
import Link from '@/components/elements/Link';
import PortraitBanner from '@/components/layouts/curation/PortraitBanner';
import { TypeBanner } from '@/types/banner';
import { TypeBannerResponse, TypeCurationMeta } from '@/types/operation';

interface TypeCarouselPortrait {
  config: TypeBannerResponse;
}

const CarouselPortrait = ({ config }: TypeCarouselPortrait) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const banners: TypeBanner[] = config?.data ?? [];
  const bannerMeta: TypeCurationMeta = config?.meta ?? {};

  const { publicTitle, publicSubtitle, publicSubtitleLink } = bannerMeta;

  const ENABLED_SWIPER = banners.length > 5;

  SwiperCore.use([Navigation]);

  const settings = {
    breakpoints: {
      0: {
        slidesOffsetBefore: 20,
        slidesOffsetAfter: 20,
        spaceBetween: 16,
        slidesPerView: 1.9,
      },
      560: {
        slidesOffsetBefore: 20,
        slidesOffsetAfter: 20,
        spaceBetween: 16,
        slidesPerView: 2.7,
      },
      720: {
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        spaceBetween: 16,
        slidesPerView: 4,
      },
      960: {
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        spaceBetween: 32,
        slidesPerView: 5,
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

  if (!banners.length) return null;

  return (
    <section className="carousel-card carousel-portrait">
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
            {banners.map((banner) => (
              <SwiperSlide key={banner.id}>
                <PortraitBanner key={banner.id} banner={banner} />
              </SwiperSlide>
            ))}
          </Swiper>

          {publicSubtitle && publicSubtitleLink && (
            <span className="catalog-more">
              <Link className="catalog-more__link" href={publicSubtitleLink}>
                <p className="a11y">{publicTitle}</p>
                {publicSubtitle}
                <IconArrowTail className="catalog-more__icon" />
              </Link>
            </span>
          )}
        </div>
      </div>
    </section>
  );
};
export default CarouselPortrait;
