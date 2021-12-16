import React from 'react';
import { User } from './types';

interface AdminUserActionProps {
  user: User;
}

export const AdminUserAction = ({
  user,
}: AdminUserActionProps): JSX.Element => {
  return (
    <td>
      <a
        href={`admin/users/${user.id}/toggle`}
        className="text-indigo-600 hover:text-indigo-900 px-2 py-4"
      >
        Toggle Admin Status
      </a>
    </td>
  );
};

export default AdminUserAction;
