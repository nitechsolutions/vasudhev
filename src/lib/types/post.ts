export interface PostItem {
  title: string;
  slug: string;
  image: string;
  excerpt?: string;
  category: string;
}

export interface CategoryData {
  slug: string;
  name: string;
  emoji: string;
  posts: PostItem[];
}

export interface HomeData {
  featured: PostItem[];
  trending: PostItem[];
  categoryData: CategoryData[];
  lang: string;
  defaultLang: string;
}