import React from 'react';

interface TableBodyRowStatusProps {
  text: string;
  statusBg?: string;
  statusText?: string;
}

export const TableBodyRowStatus = ({
  text,
  statusBg = 'green-100',
  statusText = 'green-800',
}: TableBodyRowStatusProps): JSX.Element => {
  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${statusBg} text-${statusText}`}
    >
      {text}
    </span>
  );
};

export default TableBodyRowStatus;
