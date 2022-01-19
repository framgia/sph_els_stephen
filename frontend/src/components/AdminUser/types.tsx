import { ActivityLog } from '../UserProfile';

export interface FollowLog {
  id: number;
  created_at: string;
  updated_at: string;
  log: ActivityLog | ActivityLog[];
  from_id?: number;
  to_id?: number;
  following?: User;
  follower?: User;
}

export interface QuizLog {
  id: number;
  created_at: string;
  updated_at: string;
  log: ActivityLog | ActivityLog[];
  quiz_id?: number;
  user_id?: number;
  user?: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  avatar: string;
  is_following?: boolean;
  following?: FollowLog[];
  followers?: FollowLog[];
  quiz_logs?: QuizLog[];
}
