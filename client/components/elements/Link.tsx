'use client';

import { ReactNode } from 'react';
import { UrlObject } from 'url';

import NextLink from 'next/link';
import { useSnapshot } from 'valtio';

import i18nStore from '@/store/i18n';

interface TypeLink {
  className?: string;
  children: ReactNode;
  href: string | UrlObject;
  onClick?: (arg?: unknown) => void;
  scroll?: boolean;
  prefetch?: boolean;
  style?: object;
  target?: string;
  data?: string | number;
  ariaLabel?: string;
}

const Link = ({
  className,
  children,
  href,
  onClick,
  scroll = true,
  prefetch = false,
  style,
  target,
  data,
  ariaLabel,
}: TypeLink) => {
  const { lang } = useSnapshot(i18nStore);

  return (
    <NextLink
      className={className}
      href={`/${lang}${href}`}
      onClick={onClick}
      prefetch={prefetch}
      style={style}
      target={target || undefined}
      scroll={scroll}
      data-contents={data}
      aria-label={ariaLabel}
      rel={target === '_blank' ? 'noreferrer' : undefined}
    >
      {children}
    </NextLink>
  );
};

export default Link;
