export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
  meta: Meta;
}
export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
export interface ApiError {
  status: number;
  data: {
    message: string;
    status: boolean;
  };
}
