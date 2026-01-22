// src/types/api.ts

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  posts: T[];
  pagination: Pagination;
}

export interface ApiError {
  error: string;
}
