import Image from 'next/image';

import Link from '@/components/elements/Link';
import { TypeBanner } from '@/types/banner';

interface TypePortraitBanner {
  banner: TypeBanner;
}
const PortraitBanner = ({ banner }: TypePortraitBanner) => {
  const { title, subtitle, assets, targetUrl = '/', targetWindow } = banner;

  const assetUrl = assets.NORMAL?.length ? assets.NORMAL[0].url : '';
  const [titleColor, label, labelColor, desc, descColor] = subtitle?.split('||') ?? [];

  return (
    <figure className="card portrait">
      <Link className="card__link portrait__link" href={targetUrl} target={targetWindow}>
        {assetUrl && <Image src={assetUrl} className="portrait__img" width={198} height={260} loading="lazy" alt="" />}

        <figcaption className="portrait__caption" data-badge-label={label} style={{ color: labelColor }}>
          <small className="portrait__note" style={{ color: descColor }}>
            {desc}
          </small>
          <strong
            className="portrait__title"
            style={{ color: titleColor }}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </figcaption>
      </Link>
    </figure>
  );
};
export default PortraitBanner;
