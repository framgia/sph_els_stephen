import UserDashboard from './UserDashboard';

export const simple_to_plural = (
  count: number,
  word: string,
  suffix: string = 's'
) => {
  return count > 1 ? `${word}${suffix}` : word;
};

export * from './UserDashboard';
export * from './UserLearnedWords';
export * from './TabPanel';
export default UserDashboard;
