export function buildPostUrl(
  lang: string,
  category: string,
  slug: string,
  defaultLang: string
) {
  if (lang === defaultLang) {
    return `blog/${category}/${slug}`;
  }

  return `/${lang}/${category}/${slug}`;
}