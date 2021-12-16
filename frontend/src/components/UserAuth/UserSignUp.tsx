import { LockClosedIcon } from '@heroicons/react/outline';
import React from 'react';
import {
  UserAuthButton,
  UserAuthField,
  UserAuthForm,
  UserAuthHeader,
  UserAuthLoginExtra,
} from '.';

export const UserSignUp = () => {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <UserAuthHeader>Register to Stephen's E-Learning System</UserAuthHeader>

        <UserAuthForm action="#" method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <UserAuthField
              label="Full Name"
              name="name"
              rounded="t-md rounded-b-md"
            />
          </div>

          <div className="rounded-md shadow-sm -space-y-px">
            <UserAuthField
              label="Email Address"
              name="email"
              type="email"
              rounded="t-md"
            />
            <UserAuthField label="Password" name="password" rounded="none" />
            <UserAuthField
              label="Password Confirmation"
              name="password_confirmation"
              rounded="b-md"
            />
          </div>

          <UserAuthButton label="Register" />
        </UserAuthForm>
      </div>
    </div>
  );
};

export default UserSignUp;
