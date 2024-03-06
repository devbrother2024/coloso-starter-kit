'use client';

import Image from 'next/image';

import Link from '@/components/elements/Link';
import { TypeBanner } from '@/types/banner';
import { TypeBannerResponse, TypeCurationMeta } from '@/types/operation';

interface TypeQuickLinks {
  config: TypeBannerResponse;
}

const QuickLinks = ({ config }: TypeQuickLinks) => {
  const quickLinks: TypeBanner[] = config?.data ?? [];
  const quickLinkMeta: TypeCurationMeta = config?.meta ?? {};

  const assetUrl = (item: TypeBanner) => {
    const [posterImage] = item?.assets?.NORMAL || [];
    return posterImage?.url;
  };

  if (!quickLinks.length) return null;

  return (
    <nav className="quick-link">
      <div className="quick-link__wrapper">
        <h2 className="a11y">{quickLinkMeta.publicTitle}</h2>
        {quickLinks.map((item) => (
          <Link
            key={item.id}
            className="quick-link__item"
            target={item.targetWindow}
            href="/products/vfxartist-kisonglee-us"
          >
            <figure className="quick-link__figure">
              <span className="quick-link__thumb" data-placeholder={true}>
                <Image src={assetUrl(item)} loading="lazy" alt={item.title} width={256} height={256} />
              </span>
              <figcaption className="quick-link__caption">{item.title}</figcaption>
            </figure>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default QuickLinks;
