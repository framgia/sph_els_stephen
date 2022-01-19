import { Popover } from '@headlessui/react';

import HeaderItem from './HeaderItem';
import { useCookies } from 'react-cookie';

const HeaderLinks = () => {
  const [cookies] = useCookies();

  return (
    <Popover.Group as="nav" className="hidden md:flex space-x-10">
      {cookies?.user && (
        <>
          <HeaderItem label="Quizzes" href="/quizzes" />
          <HeaderItem label="Users" href="/users" />
        </>
      )}
    </Popover.Group>
  );
};

export default HeaderLinks;
