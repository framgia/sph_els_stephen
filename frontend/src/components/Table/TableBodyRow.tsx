import React from 'react';

interface TableBodyRowProps {
  children: React.ReactNode;
}

export const TableBodyRow = ({ children }: TableBodyRowProps): JSX.Element => {
  return <tr>{children}</tr>;
};

export default TableBodyRow;
