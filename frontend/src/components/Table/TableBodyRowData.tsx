import React from 'react';

interface TableBodyRowDataProps {
  children: React.ReactNode;
}

export const TableBodyRowData = ({
  children,
}: TableBodyRowDataProps): JSX.Element => {
  return <td className="px-6 py-4 whitespace-nowrap">{children}</td>;
};

export default TableBodyRowData;
