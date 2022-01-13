import React from 'react';
import { User } from '.';
import {
  TableBodyRow,
  TableBodyRowData,
  TableBodyRowAvatar,
  TableBodyRowStatus,
} from '../Table';
import { AdminUserAction } from './AdminUserAction';

interface AdminUserBodyProps {
  users?: User[];
}

export const AdminUserBody = ({ users }: AdminUserBodyProps): JSX.Element => {
  return (
    <>
      {users?.map((user) => {
        return (
          <TableBodyRow key={user.id}>
            <TableBodyRowData>
              <div className="flex items-center">
                <TableBodyRowAvatar src={user.avatar} />
                <div className="ml-4">{user.name}</div>
              </div>
            </TableBodyRowData>
            <TableBodyRowData>{user.email}</TableBodyRowData>
            <TableBodyRowData>
              <TableBodyRowStatus
                text={user.is_admin ? 'Admin' : 'User'}
                statusBg={user.is_admin ? 'green-100' : 'cyan-100'}
                statusText={user.is_admin ? 'green-900' : 'cyan-900'}
              />
            </TableBodyRowData>
            <AdminUserAction user={user} />
          </TableBodyRow>
        );
      })}
    </>
  );
};

export default AdminUserBody;
