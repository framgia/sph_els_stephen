import React from 'react';

interface TableBodyRowAvatarProps {
  src: string;
}

export const TableBodyRowAvatar = ({
  src,
}: TableBodyRowAvatarProps): JSX.Element => {
  return (
    <div className="flex-shrink-0 h-10 w-10">
      <img className="h-10 w-10 rounded-full" src={src} alt="" />
    </div>
  );
};

export default TableBodyRowAvatar;
