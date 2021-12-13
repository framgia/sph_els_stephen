import { Popover } from '@headlessui/react';

import HeaderLinks from './HeaderLinks';
import HeaderAuth from './HeaderAuth';
import Hamburger from './Hamburger';
import HamburgerMenu from './HamburgerMenu';
import HeaderLogo from './HeaderLogo';

import { solutions, resources } from '.';

const Header = (): JSX.Element => {
  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <HeaderLogo />
          <Hamburger />

          <HeaderLinks />
          <HeaderAuth />
        </div>
      </div>

      <HamburgerMenu solutions={solutions} resources={resources} />
    </Popover>
  );
};

export default Header;
