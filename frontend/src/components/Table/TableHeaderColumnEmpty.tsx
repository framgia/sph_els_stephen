import React from 'react';

interface TableHeaderColumnEmptyProps {
  label: string;
}

const TableHeaderColumnEmpty = ({ label }: TableHeaderColumnEmptyProps) => {
  return (
    <th scope="col" className="relative px-6 py-3">
      <span className="sr-only">{label}</span>
    </th>
  );
};

export default TableHeaderColumnEmpty;
