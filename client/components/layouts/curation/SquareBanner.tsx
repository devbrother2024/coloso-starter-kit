import Image from 'next/image';

import Link from '@/components/elements/Link';
import { TypeBanner } from '@/types/banner';

interface TypeSquareBanner {
  banner: TypeBanner;
}
const SquareBanner = ({ banner }: TypeSquareBanner) => {
  const { title, subtitle, assets, targetUrl = '/', targetWindow } = banner;

  const assetUrl = assets.NORMAL?.length ? assets.NORMAL[0].url : '';
  const [titleColor, label, labelColor, desc, descColor] = subtitle?.split('||') ?? [];

  return (
    <figure className="card square">
      <Link className="card__link square__link" href={targetUrl} target={targetWindow}>
        {assetUrl && <Image src={assetUrl} className="square__img" width={123} height={123} loading="lazy" alt="" />}

        <figcaption className="square__caption" data-badge-label={label} style={{ color: labelColor }}>
          <small className="square__note" style={{ color: descColor }}>
            {desc}
          </small>
          <strong className="square__title" style={{ color: titleColor }} dangerouslySetInnerHTML={{ __html: title }} />
        </figcaption>
      </Link>
    </figure>
  );
};
export default SquareBanner;
