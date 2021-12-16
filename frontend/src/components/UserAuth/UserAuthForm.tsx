import { LockClosedIcon } from '@heroicons/react/solid';
import React, { FormEventHandler } from 'react';

interface UserAuthFormProps {
  children: React.ReactNode;
  handleSubmit: FormEventHandler<HTMLFormElement>;
}

export const UserAuthForm = ({
  children,
  handleSubmit,
}: UserAuthFormProps): JSX.Element => {
  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default UserAuthForm;
