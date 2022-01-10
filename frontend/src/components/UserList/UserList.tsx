import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

import { UserListColumns } from '.';
import { randomEmail, randomName } from '@mui/x-data-grid-generator';

const SampleRows = [
  {
    id: 1,
    avatar: null,
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
    <div className="container mx-auto mt-20 h-screen">
      <div className="flex mx-auto h-4/6 w-1/2 ">
        <div className="flex-grow">
          <DataGrid
            rows={SampleRows}
            columns={UserListColumns}
            pagination
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
          />
        </div>
      </div>
    </div>
  );
};

export default UserList;
