import Link from '@/components/elements/Link';
import ResponsiveImage from '@/components/modules/common/ResponsiveImage';
import { TypeBanner } from '@/types/banner';

interface TypeWide {
  banner: TypeBanner;
}

const WideBanner = ({ banner }: TypeWide) => {
  const { title, subtitle, assets, targetUrl, targetWindow } = banner;

  const desktopAsset = assets.DESKTOP?.length ? assets.DESKTOP[0].url : '';
  const mobileAsset = assets.MOBILE?.length ? assets.MOBILE[0].url : desktopAsset;
  const [titleColor, label, labelColor, desc, descColor, themeColor, publicTitle] = subtitle?.split('||') ?? [];

  return (
    <div className="wide">
      <h3 className="a11y" dangerouslySetInnerHTML={{ __html: title || publicTitle }} />
      <Link className="wide__link" href={targetUrl || '/'} target={targetWindow}>
        <figure className="wide__figure">
          <ResponsiveImage
            primary={desktopAsset}
            response={mobileAsset}
            loaderPrimary="172px"
            width={1120}
            height={140}
            breakPoint={720}
          />
          <figcaption className="wide__caption">
            <strong
              className="wide__strong"
              style={{ color: titleColor }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            {(label || desc) && (
              <span className="wide__label" style={{ color: descColor }}>
                {label && <i style={{ color: labelColor }}>{label}</i>}
                {desc}
              </span>
            )}
          </figcaption>
        </figure>
      </Link>
    </div>
  );
};

export default WideBanner;
