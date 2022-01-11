export interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  avatar: string;
  is_following?: boolean;
  following?: [];
  followers?: [];
  quiz_logs?: [];
}
