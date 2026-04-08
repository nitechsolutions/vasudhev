/* ================= BLOG CORE ================= */

export interface Author {
  full_name: string;
  profile_url: string | null;
  role: string;
}

export interface BlogPost {
  id: string;

  title: string;
  slug: string;
  content: string;

  image?: string | null;
  excerpt?: string | null;

  category: string;
  category_name?: string;

  published_at: string;

  author: Author | null;

  /* SEO */
  meta_title?: string | null;
  meta_description?: string | null;
}

/* ================= LIST ITEMS ================= */

export interface PostCard {
  title: string;
  slug: string;
  image?: string ;
  excerpt?: string | null;
  category: string;
}

/* ================= RELATED ================= */
