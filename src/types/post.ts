export interface Post {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image?: string;
  tags: string[];
  featured: boolean;
  trending: boolean;
  views: number;
  createdAt: string;
  author?: {
    _id: string;
    name: string;
  };
}
