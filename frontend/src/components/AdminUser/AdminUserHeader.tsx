import React from 'react';
import {
  TableHeader,
  TableHeaderColumnEmpty,
  TableHeaderColumn,
} from '../Table';

export const AdminUserHeader = () => {
  return (
    <>
      <TableHeaderColumn label="Name" />
      <TableHeaderColumn label="Email" />
      <TableHeaderColumn label="Role" />
      <TableHeaderColumnEmpty label="actions" />
    </>
  );
};

export default AdminUserHeader;
