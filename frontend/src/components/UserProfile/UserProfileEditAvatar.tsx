import styled from '@emotion/styled';
import { PhotoCamera } from '@mui/icons-material';
import { Alert, Box, Button, CircularProgress, Stack } from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { userUpdateProfileAvatar } from '../../actions';
import { StoreState } from '../../reducers';

const Input = styled('input')({
  display: 'none',
});

interface Props {
  userUpdateProfileAvatar: Function;
}

export const _UserProfileEditAvatar = ({ userUpdateProfileAvatar }: Props) => {
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
    let avatarData = {
      user_id: cookies.user.id,
      formdata: formdata,
      callback: (response: AxiosResponse) => {
        setSuccess(true);
        setMsg('Avatar Changed');
        let data = response.data?.data;
        setSrc(data.avatar);
        setCookies('user', data, { path: '/' });
      },
      errorCallback: (err: AxiosError) => {
        setError(true);
        let errordata = err.response?.data;
        setMsg(errordata?.error?.message);
      },
      finallyCallback: () => {
        setLoading(false);
      },
    };

    userUpdateProfileAvatar(avatarData);
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

const mapStateToProps = ({}: StoreState): {} => {
  return {};
};

export const UserProfileEditAvatar = connect(mapStateToProps, {
  userUpdateProfileAvatar,
})(_UserProfileEditAvatar);

export default UserProfileEditAvatar;
