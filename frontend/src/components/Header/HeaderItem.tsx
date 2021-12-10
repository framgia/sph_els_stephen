import React from 'react';

interface HeaderItemProps {
  label: string;
  href?: string;
}

const HeaderItem = ({ label, href = '#' }: HeaderItemProps) => {
  return (
    <a
      href={href}
      className="text-base font-medium text-gray-500 hover:text-gray-900"
    >
      {label}
    </a>
  );
};

export default HeaderItem;
