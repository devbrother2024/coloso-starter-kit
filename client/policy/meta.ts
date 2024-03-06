import { getFavicon, getAppleIcon, meta } from '@/client/policy';
import { CustomerLanguageCode } from '@/policy/language';
import { getCanonicalLanguages } from '@/utils/canonicalLanguage';

export const title = {
  default: meta.title,
  template: `%s | ${meta.title}`,
};

const canonicalLanguages = getCanonicalLanguages(CustomerLanguageCode);

export const site = {
  title,
  description: meta.description,
  keywords: meta.keywords,
  metadataBase: new URL(meta.url),
  alternates: {
    canonical: '/',
    languages: canonicalLanguages,
  },
};

export const common = {
  icons: {
    icon: {
      url: getFavicon(),
      sizes: '32x32',
      type: 'image/png',
    },
    apple: {
      url: getAppleIcon(),
      sizes: '180x180',
      type: 'image/png',
    },
  },
  verification: {
    other: {
      'naver-site-verification': '04b1b6b89e08d4b8a47b964a791fbf30c99f49cd',
    },
  },
};

export const openGraph = {
  type: 'website',
  title: meta.title,
  description: meta.description,
  url: meta.url,
  images: {
    width: 600,
    height: 315,
    url: meta.image,
  },
};

export const twitter = {
  card: 'summary',
  title: meta.title,
  description: meta.description,
  images: [meta.image],
};

export const other = {
  'twitter:player:width': 600,
  'twitter:player:height': 315,
  'facebook-domain-verification': 'ylw14rh95gy7w1lpk5cuv7dlaxvnrm',
};
