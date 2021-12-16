import { LockClosedIcon } from '@heroicons/react/solid';
import React from 'react';

interface UserAuthButtonProps {
  label: string;
}

export const UserAuthButton = ({ label }: UserAuthButtonProps): JSX.Element => {
  return (
    <div>
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <LockClosedIcon
            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
            aria-hidden="true"
          />
        </span>
        {label}
      </button>
    </div>
  );
};

export default UserAuthButton;
