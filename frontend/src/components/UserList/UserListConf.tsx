import { Avatar } from '@mui/material';
import { GridColumns, GridRenderCellParams } from '@mui/x-data-grid';

export const UserListColumns: GridColumns = [
  {
    field: 'avatar',
    headerName: 'Avatar',
    width: 180,
    renderCell: (params: GridRenderCellParams) => {
      return params.value ? (
        <Avatar alt="Remy Sharp" src={params.value} />
      ) : (
        <Avatar>{params.row.name[0]}</Avatar>
      );
    },
  },
  { field: 'name', headerName: 'Name', width: 230 },
  { field: 'email', headerName: 'Email', width: 260 },
];
