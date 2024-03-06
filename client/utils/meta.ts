import { meta } from '@/client/policy';
import { CustomerLanguageCode } from '@/policy/language';
import { LocaleOptions } from '@/policy/local';
import { site, common, openGraph, twitter, other } from '@/policy/meta';
import { TypeProductMeta, TypeSiteMeta } from '@/types/meta';
import { getCanonicalLanguages } from '@/utils/canonicalLanguage';

export const Meta = { ...site, ...common, openGraph, twitter, other };

export const updateSiteMeta = ({ title, description, keywords, url, image, lang }: TypeSiteMeta) => {
  const canonicalUrl = url;
  title = title || meta.title;
  description = description || meta.description;
  keywords = keywords || meta.keywords;
  url = `${meta.url}/${lang}${url || ''}`;
  image = image || meta.image;

  const canonicalLanguages = getCanonicalLanguages(CustomerLanguageCode, canonicalUrl);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: canonicalLanguages,
    },
    openGraph: {
      ...openGraph,
      title,
      description,
      url,
      images: {
        ...openGraph.images,
        url: image,
      },
    },
    twitter: {
      ...twitter,
      title: title,
      description: description,
      images: [image],
    },
  };
};

export const updateLocaleMeta = (lang: string) => {
  return {
    openGraph: {
      ...openGraph,
      locale: lang,
    },
  };
};
