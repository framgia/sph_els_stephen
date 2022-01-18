import UserProfile from './UserProfile';

export * from './UserProfileEdit';
export * from './UserProfileEditAvatar';
export * from './UserProfileEditDetails';
export * from './UserProfileEditPassword';
export * from './Activities';
export * from './activitiesHelper';

export default UserProfile;

export const PasswordEditFormValidation = {
  password: {
    required: {
      value: true,
      message: 'This field is required.',
    },
    minLength: {
      value: 6,
      message: 'Password minimum length is 6',
    },
    maxLength: {
      value: 255,
      message: 'Full Name field max character up to 255 only.',
    },
  },
  new_password: {
    required: {
      value: true,
      message: 'This field is required.',
    },
    minLength: {
      value: 6,
      message: 'Password minimum length is 6',
    },
    maxLength: {
      value: 255,
      message: 'Email field max character up to 255 only.',
    },
  },
  new_password_confirmation: {
    required: {
      value: true,
      message: 'This field is required.',
    },
    minLength: {
      value: 6,
      message: 'Password minimum length is 6',
    },
    maxLength: {
      value: 255,
      message: 'Email field max character up to 255 only.',
    },
  },
};
