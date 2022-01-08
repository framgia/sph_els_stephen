import React, { useEffect, useState } from 'react';
import { User } from '../AdminUser';

import { Avatar, Chip } from '@mui/material';
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid';

interface Props {
  usersWithFollows: User[];
  handleFollowClick: Function;
}

export const UserListData = ({
  usersWithFollows,
  handleFollowClick,
}: Props) => {
  const [pageSize, setPageSize] = useState(10);

  const renderFollowButton = (params: GridRenderCellParams) => {
    return (
      <Chip
        label={params.row.following ? 'Unfollow' : 'Follow'}
        onClick={(e) => handleFollowClick(e, params)}
        color={params.row.following ? 'primary' : 'info'}
        variant={params.row.following ? 'filled' : 'outlined'}
      />
    );
  };

  const UserListColumns: GridColumns = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 120,
      renderCell: (params: GridRenderCellParams) => {
        return params.value ? (
          <Avatar alt={params.row.name} src={params.value} />
        ) : (
          <Avatar>{params.row.name[0]}</Avatar>
        );
      },
    },
    { field: 'name', headerName: 'Name', width: 210 },
    { field: 'email', headerName: 'Email', width: 260 },
    {
      field: 'following',
      headerName: 'Follow',
      width: 100,
      renderCell: (params: GridRenderCellParams) => {
        return renderFollowButton(params);
      },
    },
  ];

  return (
    <DataGrid
      rows={usersWithFollows}
      columns={UserListColumns}
      pagination
      pageSize={pageSize}
      onPageSizeChange={(ps) => setPageSize(ps)}
      rowsPerPageOptions={[10, 25, 50]}
    />
  );
};

export default UserListData;
