export function buildPostUrl(
  lang: string,
  category: string,
  slug: string,
  defaultLang: string
) {
  if (lang === defaultLang) {
    return `/${category}/${slug}`;
  }

  return `/${lang}/${category}/${slug}`;
}