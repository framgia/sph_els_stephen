import React from 'react';

interface TableHeaderColumnProps {
  label: string;
}

const TableHeaderColumn = ({ label }: TableHeaderColumnProps) => {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      {label}
    </th>
  );
};

export default TableHeaderColumn;
