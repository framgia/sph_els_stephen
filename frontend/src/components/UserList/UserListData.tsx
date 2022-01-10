import React, { useState } from 'react';
import { User } from '../AdminUser';
import { UserListFollowButton } from '.';

import { Avatar } from '@mui/material';
import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';
import { useNavigate } from 'react-router';

interface Props {
  usersWithFollows: User[];
  handleFollowClick: Function;
}

export const UserListData = ({
  usersWithFollows,
  handleFollowClick,
}: Props) => {
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

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
        return (
          <UserListFollowButton
            params={params}
            handleFollowClick={handleFollowClick}
          />
        );
      },
    },
  ];

  const handleDoubleClick = (params: GridRowParams, e: any) => {
    navigate(`/users/${params.id}`);
  };

  return (
    <DataGrid
      rows={usersWithFollows}
      columns={UserListColumns}
      pagination
      pageSize={pageSize}
      onPageSizeChange={(ps) => setPageSize(ps)}
      rowsPerPageOptions={[10, 25, 50]}
      onRowDoubleClick={(params, e) => handleDoubleClick(params, e)}
    />
  );
};

export default UserListData;
