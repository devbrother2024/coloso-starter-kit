import { memo } from 'react';

import { cx } from '@emotion/css';
import Image from 'next/image';

import Loader from '@/components/elements/Loader';

interface TypeResponsiveImage {
  loaderResponse?: string;
  loaderPrimary?: string;
  breakPoint?: number;
  className?: string;
  priority?: boolean;
  response: string;
  primary: string;
  height?: number;
  width?: number;
  alt?: string;
}

// FIXME
const ResponsiveImage = ({
  breakPoint = 960,
  priority = false,
  loaderResponse,
  loaderPrimary,
  width = 1200,
  height = 214,
  className,
  alt = '',
  response,
  primary,
}: TypeResponsiveImage) => {
  return primary ? (
    <picture className={cx(className, 'responsive-picture')}>
      <source media={`${breakPoint ? `(min-width: ${breakPoint}px)` : ''}`} srcSet={primary} />
      <source media={`${breakPoint ? `(max-width: ${breakPoint - 1}px)` : ''}`} srcSet={response} />
      <Image
        loading={priority ? 'eager' : 'lazy'}
        className="panorama"
        priority={priority}
        src={`${primary}`}
        height={height}
        width={width}
        alt={alt}
      />
    </picture>
  ) : (
    <Loader primary={loaderPrimary} response={loaderResponse} />
  );
};
export default memo(ResponsiveImage);
