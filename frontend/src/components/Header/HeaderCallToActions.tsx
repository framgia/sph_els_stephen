import React from 'react';

import { CallToAction } from './types';

interface HeaderCallToActionsProps {
  item: CallToAction;
}

const HeaderCallToActions = ({ item }: HeaderCallToActionsProps) => {
  return (
    <div key={item.name} className="flow-root">
      <a
        href={item.href}
        className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
      >
        <item.icon
          className="flex-shrink-0 h-6 w-6 text-gray-400"
          aria-hidden="true"
        />
        <span className="ml-3">{item.name}</span>
      </a>
    </div>
  );
};

export default HeaderCallToActions;
