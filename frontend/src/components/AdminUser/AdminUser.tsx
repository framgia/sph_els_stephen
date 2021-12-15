import React from 'react';
import { User, AdminUserHeader, AdminUserBody } from '.';
import Table from '../Table';

interface AdminUserProps {
  title: string;
  users?: User[];
}

export const AdminUser = ({ title, users }: AdminUserProps): JSX.Element => {
  return (
    <div className="container mx-auto px-24 py-8">
      <h1>Users List</h1>
      <Table
        headers={<AdminUserHeader />}
        body={<AdminUserBody users={users} />}
      />
    </div>
  );
};

export default AdminUser;
