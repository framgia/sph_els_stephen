import styled from '@emotion/styled';
import { PhotoCamera } from '@mui/icons-material';
import { Alert, Box, Button, CircularProgress, Stack } from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import backend from '../../api/backend';

const Input = styled('input')({
  display: 'none',
});

interface Props {}

export const UserProfileEditAvatar = (props: Props) => {
  const [cookies, setCookies] = useCookies();

  const backend_url = process.env.REACT_APP_BACKEND_URL;

  const [src, setSrc] = useState(`${backend_url}/storage/avatars/default.jpg`);

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cookies.user?.avatar) {
      setSrc(cookies.user?.avatar);
    }
    return () => {};
  }, []);

  const handleFileChange = (e: any) => {
    let formdata = new FormData();
    let image = e.target.files[0];
    formdata.append('_method', 'PUT');
    formdata.append('avatar', image);

    setLoading(true);
    setError(false);
    setSuccess(false);
    backend.get('/sanctum/csrf-cookie').then((csrf_response) => {
      backend
        .post(`/api/users/${cookies.user.id}`, formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response: AxiosResponse) => {
          setSuccess(true);
          setMsg('Avatar Changed');
          let data = response.data?.data;
          setSrc(data.avatar);
          setCookies('user', data, { path: '/' });
        })
        .catch((err: AxiosError) => {
          setError(true);
          let errordata = err.response?.data;
          setMsg(errordata?.error?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return (
    <div>
      <img
        className="mx-auto mt-4"
        src={src}
        width={200}
        height={200}
        alt="Profile Image"
      />
      <div className="mx-auto mt-5">
        <Stack>
          {error || success ? (
            <Alert severity={error ? 'error' : success ? 'success' : 'info'}>
              {msg}
            </Alert>
          ) : null}
          {loading ? <CircularProgress /> : null}
          <label htmlFor="avatar">
            <Input
              type="file"
              accept="image/*"
              id="avatar"
              onChange={(e) => handleFileChange(e)}
            />
            <Button
              variant="contained"
              component="span"
              endIcon={<PhotoCamera />}
            >
              Upload Photo
            </Button>
          </label>
        </Stack>
      </div>
    </div>
  );
};

export default UserProfileEditAvatar;
