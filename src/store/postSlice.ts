import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Post } from "@/types/post";

interface PostsState {
  posts: Post[];
  single: Post | null;
  related: Post[];
  featured: Post | null;
  trending: Post[];
  page: number;
  totalPages: number;
  loading: boolean;
}

const initialState: PostsState = {
  posts: [],
  single: null,
  related: [],
  featured: null,
  trending: [],
  page: 1,
  totalPages: 1,
  loading: false,
};

export const fetchLatestPosts = createAsyncThunk(
  "posts/fetchLatest",
  async ({ page, limit }: { page: number; limit: number }) => {
    const res = await fetch(
      `/api/posts?&page=${page}&limit=${limit}`,
    );
    return res.json();
  },
);

export const fetchCategoryPosts = createAsyncThunk(
  "posts/fetchCategory",
  async ({ category, page, limit }: {category:string, page: number; limit: number }) => {
    const res = await fetch(
      `/api/posts?category=${category}&page=${page}&limit=${limit}`,
    );
    return res.json();
  },
);

export const fetchFeaturedPosts = createAsyncThunk(
  "posts/fetchFeatured",
  async () => {
    const res = await fetch(`/api/posts?type=featured&limit=1`);
    return res.json();
  },
);

export const fetchTrendingPosts = createAsyncThunk(
  "posts/fetchTrending",
  async () => {
    const res = await fetch(`/api/posts?type=trending&limit=6`);
    return res.json();
  },
);

export const fetchPostBySlug = createAsyncThunk(
  "post/fetchBySlug",
  async (slug: string) => {
    const res = await fetch(`/api/posts/public/${slug}`);
    if (!res.ok) throw new Error("Post not found");
    return res.json();
  }
);

/* ---------- Fetch related posts ---------- */
export const fetchRelatedPosts = createAsyncThunk(
  "post/fetchRelated",
  async (category: string) => {
    const res = await fetch(
      `/api/posts?category=${encodeURIComponent(category)}&limit=6`
    );
    const data = await res.json();
    return data.posts as Post[];
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLatestPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.totalPages = action.payload.pagination.totalPages;
      })
      .addCase(fetchCategoryPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoryPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.totalPages = action.payload.pagination.totalPages;
      })
      .addCase(fetchFeaturedPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeaturedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.featured = action.payload.posts?.[0] || null;
      })
      .addCase(fetchTrendingPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrendingPosts.fulfilled, (state, action) => {
        state.trending = action.payload.posts;
      })
      .addCase(fetchPostBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostBySlug.fulfilled, (state, action) => {
        state.single = action.payload;
        state.loading = false;
      })
      .addCase(fetchRelatedPosts.fulfilled, (state, action) => {
        state.related = action.payload;
      });
  },
});

export const { setPage } = postsSlice.actions;
export default postsSlice.reducer;
