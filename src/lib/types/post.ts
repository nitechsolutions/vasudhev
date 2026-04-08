export interface PostItem {
  title: string;
  slug: string;
  image: string;
  excerpt?: string;
  category: string;
}

export interface PostCard {
  title: string;
  slug: string;
  image?: string ;
  excerpt?: string | null;
  category: string;
}

export interface CategoryData {
  slug: string;
  name: string;
  emoji: string;
  posts: PostCard[];
}

export interface HomeData {
  featured: PostCard[];
  trending: PostCard[];
  categoryData: CategoryData[];
  lang: string;
  defaultLang: string;
}