import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import HeaderDropDown from './HeaderDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { SvgIcon } from '@mui/material';

const HeaderAuth = () => {
  const [cookies, setCookies] = useCookies();

  const createDropDownIcon = (Icon: any) => (props: any) => <Icon {...props} />;

  const userOptions = [
    {
      name: 'Account',
      description: 'View and Edit Account',
      href: '/account/profile/edit',
      icon: createDropDownIcon(AccountBoxIcon),
    },
    {
      name: 'Sign Out',
      description: 'Are you really going?',
      href: '/signout',
      icon: createDropDownIcon(LogoutIcon),
    },
  ];

  return !cookies.user ? (
    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
      <Link
        to="/signin"
        className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
      >
        Sign in
      </Link>
      <Link
        to="/signup"
        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Sign up
      </Link>
    </div>
  ) : (
    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
      <HeaderDropDown label={cookies.user?.name} dropDownItems={userOptions}>
        <div>
          <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">
            Welcome Back!
          </h3>
        </div>
      </HeaderDropDown>
    </div>
  );
};

export default HeaderAuth;
