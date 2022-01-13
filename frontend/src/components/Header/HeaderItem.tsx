import { Link } from 'react-router-dom';

interface HeaderItemProps {
  label: string;
  href?: string;
}

const HeaderItem = ({ label, href = '#' }: HeaderItemProps) => {
  return (
    <Link
      to={href}
      className="text-base font-medium text-gray-500 hover:text-gray-900"
    >
      {label}
    </Link>
  );
};

export default HeaderItem;
