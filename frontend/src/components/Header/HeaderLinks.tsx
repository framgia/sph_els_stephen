import { Popover } from '@headlessui/react';

import HeaderItem from './HeaderItem';
import HeaderDropDown from './HeaderDropDown';
import { callsToAction, solutions, recentPosts } from '.';

const HeaderLinks = () => {
  return (
    <Popover.Group as="nav" className="hidden md:flex space-x-10">
      {/* <HeaderDropDown
        label="Quizzes"
        dropDownItems={solutions}
        callToActions={callsToAction}
      /> */}

      <HeaderItem label="Admin Quiz" href="/admin/quizzes" />
      <HeaderItem label="Admin User List" href="/admin/users" />
      <HeaderItem label="User Profile" href="/profile" />

      {/* <HeaderDropDown label="Quizzes" dropDownItems={solutions}>
        <div>
          <h3 className="text-sm tracking-wide font-medium text-gray-500 uppercase">
            Recent Posts
          </h3>
          <ul role="list" className="mt-4 space-y-4">
            {recentPosts.map((post) => (
              <li key={post.id} className="text-base truncate">
                <a
                  href={post.href}
                  className="font-medium text-gray-900 hover:text-gray-700"
                >
                  {post.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </HeaderDropDown> */}
    </Popover.Group>
  );
};

export default HeaderLinks;
