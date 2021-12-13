import React from 'react';
import TableHeaderColumn from './TableHeaderColumn';

interface TableHeaderProps {
  children: React.ReactNode;
}

const TableHeader = ({ children }: TableHeaderProps): JSX.Element => {
  return (
    <thead className="bg-gray-50">
      <tr>{children}</tr>
    </thead>
  );
};

export default TableHeader;
