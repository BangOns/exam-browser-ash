export interface ExamToken {
  token: string;
  is_active: boolean;
  expired_at: string;
}
export interface ExamTokenRequest {
  token: string;
  id: string;
}
