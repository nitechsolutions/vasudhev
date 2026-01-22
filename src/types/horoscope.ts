// src/types/horoscope.ts

export type ZodiacKey =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

export interface Horoscope {
  _id?: string;
  zodiac: ZodiacKey;
  date: string; // YYYY-MM-DD
  content_hi: string;
  createdAt?: string;
  updatedAt?: string;
}
