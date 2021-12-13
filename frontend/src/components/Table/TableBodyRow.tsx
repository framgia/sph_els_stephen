import React from 'react';

interface TableBodyRowProps {
  key?: any;
  children: React.ReactNode;
}

const TableBodyRow = ({ key, children }: TableBodyRowProps): JSX.Element => {
  return <tr key={key}>{children}</tr>;
};

export default TableBodyRow;
