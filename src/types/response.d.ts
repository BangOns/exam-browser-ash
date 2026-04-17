export type ApiResponse<T> = {
  data: T;
  message: string;
  status: number | string;
  code: number | string;
};
