import React from 'react';
import TableHeader from '../Table/TableHeader';
import TableHeaderColumn from '../Table/TableHeaderColumn';
import TableHeaderColumnEmpty from '../Table/TableHeaderColumnEmpty';

const AdminQuizHeader = () => {
  return (
    <TableHeader>
      <TableHeaderColumn label="Title" />
      <TableHeaderColumn label="Description" />
      <TableHeaderColumnEmpty label="actions" />
    </TableHeader>
  );
};

export default AdminQuizHeader;
