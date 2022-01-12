import { Backdrop, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import backend from '../../api/backend';

interface Props {}

export const UserSignOut = (props: Props) => {
  const [cookies, setCookies, removeCookies] = useCookies();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      const response = await backend.post<any>(
        '/api/logout/',
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      removeCookies('user', { path: '/' });
      removeCookies('token', { path: '/' });
      setOpen(false);
      navigate('/');
    });
  }, []);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default UserSignOut;
