import { getDefaultLanguage } from "../service/language.service";

export async function resolveLang(paramsLang?: string) {
  const defaultLang = await getDefaultLanguage();

  if (!paramsLang) return defaultLang.code;

  return paramsLang;
}