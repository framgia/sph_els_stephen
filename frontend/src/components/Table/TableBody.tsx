import React from 'react';

interface TableBodyProps {
  children: React.ReactNode;
}

export const TableBody = ({ children }: TableBodyProps): JSX.Element => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
  );
};

export default TableBody;
