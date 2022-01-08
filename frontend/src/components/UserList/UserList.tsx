import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

import { UserListColumns } from '.';
import { randomEmail, randomName } from '@mui/x-data-grid-generator';

const SampleRows = [
  {
    id: 1,
    avatar: 'https://picsum.photos/200',
    name: randomEmail(),
    email: randomEmail(),
  },
  {
    id: 2,
    avatar: 'https://picsum.photos/200',
    name: randomEmail(),
    email: randomEmail(),
  },
  {
    id: 3,
    avatar: 'https://picsum.photos/200',
    name: randomEmail(),
    email: randomEmail(),
  },
  {
    id: 4,
    avatar: 'https://picsum.photos/200',
    name: randomEmail(),
    email: randomEmail(),
  },
  {
    id: 5,
    avatar: 'https://picsum.photos/200',
    name: randomEmail(),
    email: randomEmail(),
  },
];

interface Props {}

export const UserList = (props: Props) => {
  return (
    <div className="flex h-full">
      <DataGrid rows={SampleRows} columns={UserListColumns} />
    </div>
  );
};

export default UserList;
