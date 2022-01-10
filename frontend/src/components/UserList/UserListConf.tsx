import { Avatar, Chip } from '@mui/material';
import {
  GridCellParams,
  GridColumns,
  GridRenderCellParams,
} from '@mui/x-data-grid';

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
  { field: 'name', headerName: 'Name', width: 210 },
  { field: 'email', headerName: 'Email', width: 260 },
  {
    field: 'follow',
    headerName: 'Follow',
    width: 100,
    renderCell: (params: GridCellParams) => {
      return (
        <Chip
          label="Follow"
          onClick={(e) => console.log}
          color="primary"
          variant="outlined"
        />
      );
    },
  },
];
