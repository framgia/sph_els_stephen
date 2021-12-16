import React from 'react';
import { Quiz, AdminQuizAction } from '.';
import { TableBodyRow, TableBodyRowData, TableBody } from '../Table';

interface AdminQuizBodyProps {
  records: Quiz[];
}

export const AdminQuizBody = ({ records }: AdminQuizBodyProps): JSX.Element => {
  return (
    <>
      {records.map((record) => {
        return (
          <TableBodyRow key={record.title}>
            <TableBodyRowData>{record.title}</TableBodyRowData>
            <TableBodyRowData>{record.description}</TableBodyRowData>
            <AdminQuizAction record={record} />
          </TableBodyRow>
        );
      })}
    </>
  );
};

export default AdminQuizBody;
