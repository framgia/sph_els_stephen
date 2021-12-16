import { LockClosedIcon } from '@heroicons/react/solid';
import React from 'react';

interface UserAuthFormProps {
  action: string;
  method: string;
  children: React.ReactNode;
}

export const UserAuthForm = ({
  action,
  method,
  children,
}: UserAuthFormProps): JSX.Element => {
  return (
    <form className="mt-8 space-y-6" action={action} method={method}>
      {children}
    </form>
  );
};

export default UserAuthForm;
