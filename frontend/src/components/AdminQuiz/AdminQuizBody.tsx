import React from 'react';
import TableBody from '../Table/TableBody';
import TableBodyRow from '../Table/TableBodyRow';
import TableBodyRowData from '../Table/TableBodyRowData';
import AdminQuizAction from './AdminQuizAction';

import { Quiz } from './types';

interface AdminQuizBodyProps {
  records: Quiz[];
}

const AdminQuizBody = ({ records }: AdminQuizBodyProps): JSX.Element => {
  function renderList() {
    return records.map((record) => {
      return (
        <TableBodyRow key={record.title}>
          <TableBodyRowData>{record.title}</TableBodyRowData>
          <TableBodyRowData>{record.description}</TableBodyRowData>
          <AdminQuizAction record={record} />
        </TableBodyRow>
      );
    });
  }

  return <TableBody>{renderList()}</TableBody>;
};

export default AdminQuizBody;
