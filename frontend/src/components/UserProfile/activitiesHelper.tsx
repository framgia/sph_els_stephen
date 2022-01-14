import { User } from '../AdminUser';

export interface ActivityLog {
  id: number;
  message: string;
  loggable_type: string;
  loggable_id: string;
  created_at: string;
  updated_at: string;
}

export interface Activity {
  id: number;
  created_at: string;
  updated_at: string;
  log: ActivityLog;

  quiz_id?: number;
  user_id?: number;

  from_id?: number;
  to_id?: number;

  following?: User;
  follower?: User;
}

export const getActivities = (
  user: User | undefined | null
): Activity[] | null => {
  if (user) {
    let following = user?.following || [];
    let followers = user?.followers || [];
    let quiz_logs = user?.quiz_logs || [];

    return [...following, ...followers, ...quiz_logs];
  }

  return null;
};

export const sortActivities = (acitvities: Activity[] | null) => {
  acitvities?.sort((a, b) => {
    let aDate = new Date(a.created_at);
    let bDate = new Date(b.created_at);

    return aDate.getTime() - bDate.getTime();
  });
};
