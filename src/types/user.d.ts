export type UserRow = {
  name: string;
  email: string;
  role: string;
  status: string;
};

export interface DataUserLogin {
  user: User;
  token: string;
  refresh_token: string;
}

export interface User {
  id: string;
  full_name: string;
  username: string;
  role: string;
  created_at: string;
  updated_at: string;
}
