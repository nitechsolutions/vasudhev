import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Post } from "@/types/post";

interface PostsState {
  posts: Post[];
  page: number;
  totalPages: number;
  loading: boolean;
}

const initialState: PostsState = {
  posts: [],
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
      });
  },
});

export const { setPage } = postsSlice.actions;
export default postsSlice.reducer;
