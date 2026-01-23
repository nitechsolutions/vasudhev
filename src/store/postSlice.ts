import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Post } from "@/types/post";

interface PostsState {
  posts: Post[];
  featured: Post | null;
  page: number;
  totalPages: number;
  loading: boolean;
}

const initialState: PostsState = {
  posts: [],
  featured: null,
  page: 1,
  totalPages: 1,
  loading: false,
};

export const fetchLatestPosts = createAsyncThunk(
  "posts/fetchLatest",
  async ({ page, limit }: { page: number; limit: number }) => {
    const res = await fetch(
      `/api/posts?type=latest&page=${page}&limit=${limit}`
    );
    return res.json();
  }
);

export const fetchFeaturedPosts = createAsyncThunk(
  "posts/fetchFeatured",
  async () => {
    const res = await fetch(
      `/api/posts?type=featured&limit=1`
    );
    return res.json();
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
      .addCase(fetchFeaturedPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeaturedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.featured = action.payload.posts?.[0] || null;
      });;
  },
});

export const { setPage } = postsSlice.actions;
export default postsSlice.reducer;
