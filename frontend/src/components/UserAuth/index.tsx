export * from './UserSignIn';
export * from './UserSignUp';
export * from './UserSignOut';
export * from './UserAuthHeader';
export * from './UserAuthForm';
export * from './UserAuthField';
export * from './UserAuthLoginExtra';
export * from './UserAuthButton';

export const handleWhiteSpace = (value: string) => {
  if (!(value.length > 1)) return value;
  if (value.at(-1) === ' ' && value.at(-2) == ' ') return value.trim();
  return value;
};