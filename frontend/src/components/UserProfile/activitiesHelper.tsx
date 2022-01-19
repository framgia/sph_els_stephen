import { FollowLog, QuizLog, User } from '../AdminUser';

export interface ActivityLog {
  id: number;
  message: string;
  loggable_type: string;
  loggable_id: string;
  created_at: string;
  updated_at: string;
}

export interface Activity extends FollowLog, QuizLog {
  id: number;
  created_at: string;
  updated_at: string;
  log: ActivityLog | ActivityLog[];

  quiz_id?: number;
  user_id?: number;

  from_id?: number;
  to_id?: number;

  following?: User;
  follower?: User;
  user?: User;
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

    return bDate.getTime() - aDate.getTime();
  });
};

export const sortLogs = (logs: ActivityLog[] | null) => {
  logs?.sort((a, b) => {
    let aDate = new Date(a.created_at);
    let bDate = new Date(b.created_at);

    return bDate.getTime() - aDate.getTime();
  });
};

export const removeDuplicateLogs = (
  logs: Activity[] | null
): Activity[] | null => {
  if (!logs) return null;

  let check = new Set();
  return logs?.filter((log) => !check.has(log['id']) && check.add(log['id']));
};
