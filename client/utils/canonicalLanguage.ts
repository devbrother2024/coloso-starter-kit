export const getCanonicalLanguages = (languageCode: Record<string, string>, canonicalUrl = '') => {
  return Object.fromEntries(Object.entries(languageCode).map(([, value]) => [value, `/${value}${canonicalUrl}`]));
};
