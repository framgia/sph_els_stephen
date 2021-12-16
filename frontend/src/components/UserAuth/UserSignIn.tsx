import React from 'react';
import {
  UserAuthButton,
  UserAuthField,
  UserAuthForm,
  UserAuthHeader,
  UserAuthLoginExtra,
} from '.';

export const UserSignIn = () => {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <UserAuthHeader>Sign in to your Account</UserAuthHeader>

        <UserAuthForm action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <UserAuthField
              label="Email Address"
              name="email"
              type="email"
              rounded="t-md"
            />
            <UserAuthField
              label="Password"
              name="password"
              autocomplete="current-password"
              rounded="b-md"
            />
          </div>

          <UserAuthLoginExtra />

          <UserAuthButton label="Sign In" />
        </UserAuthForm>
      </div>
    </div>
  );
};

export default UserSignIn;
