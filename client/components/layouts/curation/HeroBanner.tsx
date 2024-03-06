import Link from '@/components/elements/Link';
import ResponsiveImage from '@/components/modules/common/ResponsiveImage';
import { TypeBanner } from '@/types/banner';

interface TypeHero {
  curation: TypeBanner;
}

const HeroBanner = ({ curation }: TypeHero) => {
  const themes = curation.subtitle ?? '';
  const curationAssets = curation.assets;
  const desktopAsset = curationAssets?.DESKTOP?.length ? curationAssets.DESKTOP[0].url : '';
  const mobileAsset = curationAssets?.MOBILE?.length ? curationAssets.MOBILE[0].url : desktopAsset;
  const [titleColor, desc, descColor, label, labelColor, themeColor] = themes.split('||');

  return (
    <Link
      className="hero__link"
      href={curation.targetUrl || '/'}
      style={{ background: themeColor }}
      data-swiper-parallax-opacity="0"
    >
      <figure className="hero__figure">
        <figcaption className="hero__caption" data-swiper-parallax-duration="3000" data-swiper-parallax-opacity="0">
          <div className="grid grid--large">
            <h3
              className="hero__h"
              style={{ color: titleColor }}
              dangerouslySetInnerHTML={{ __html: curation.title }}
              data-swiper-parallax="-50"
              data-swiper-parallax-duration="2000"
            />
            <p
              className="hero__p"
              style={{ color: descColor }}
              data-swiper-parallax="-50"
              data-swiper-parallax-duration="2000"
            >
              {desc}
            </p>
          </div>
        </figcaption>

        {curationAssets && (
          <div data-swiper-parallax="-3%" data-swiper-parallax-duration="1600" data-swiper-parallax-opacity="0">
            <ResponsiveImage
              className="hero__picture"
              primary={desktopAsset}
              response={mobileAsset}
              loaderPrimary={'400px'}
              width={896}
              height={616}
              breakPoint={960}
              priority={true}
            />
          </div>
        )}
      </figure>
    </Link>
  );
};

export default HeroBanner;
