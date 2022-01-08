import { GridColumns } from '@mui/x-data-grid';

export const UserListColumns: GridColumns = [
  { field: 'avatar', headerName: 'Avatar', width: 100 },
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'email', headerName: 'Email', width: 260 },
];
