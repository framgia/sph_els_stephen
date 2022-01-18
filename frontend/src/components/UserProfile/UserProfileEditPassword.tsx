import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { userUpdateProfileDetails } from '../../actions';
import { StoreState } from '../../reducers';

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from '@mui/material';
import { AxiosError } from 'axios';

export interface ProfileEditPasswordInput {
  password: string;
  new_password: string;
  new_password_repeat: string;
}

const formValidation = {
  password: {
    required: {
      value: true,
      message: 'This field is required.',
    },
    minLength: {
      value: 6,
      message: 'Password minimum length is 6',
    },
    maxLength: {
      value: 255,
      message: 'Full Name field max character up to 255 only.',
    },
  },
  new_password: {
    required: {
      value: true,
      message: 'This field is required.',
    },
    minLength: {
      value: 6,
      message: 'Password minimum length is 6',
    },
    maxLength: {
      value: 255,
      message: 'Email field max character up to 255 only.',
    },
  },
  new_password_repeat: {
    required: {
      value: true,
      message: 'This field is required.',
    },
    minLength: {
      value: 6,
      message: 'Password minimum length is 6',
    },
    maxLength: {
      value: 255,
      message: 'Email field max character up to 255 only.',
    },
  },
};

interface Props {
  userUpdateProfileDetails: Function;
}

const _UserProfileEditPassword = (props: Props) => {
  const [cookies] = useCookies();

  const [password, setPassword] = useState('');
  const [new_password, setNew_password] = useState('');
  const [new_password_repeat, setNew_password_repeat] = useState('');

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileEditPasswordInput>();

  const onSubmit = (data: ProfileEditPasswordInput) => {
    setIsLoading(true);
    setError(false);
    setSuccess(false);
    let profilePasswordData = {
      user_id: cookies.user.id,
      new_password: data.new_password,
      new_password_repeat: data.new_password_repeat,
      callback: () => {
        setSuccess(true);
        setMsg('Profile Updated Successfully');
      },
      errorCallback: (err: AxiosError) => {
        setError(true);
        let errordata = err.response?.data;
        setMsg(errordata?.error?.message);
      },
      finallyCallback: () => {
        setIsLoading(false);
      },
    };

    // userUpdateProfileDetails(profileData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          {...register('password', formValidation.password)}
          error={Boolean(errors?.password)}
          label="Full Name"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="filled"
          helperText={errors?.password?.message}
        />
      </div>
      <div>
        <TextField
          {...register('new_password', formValidation.new_password)}
          error={Boolean(errors?.new_password)}
          label="Email"
          value={new_password}
          onChange={(e) => setNew_password(e.target.value)}
          variant="filled"
          helperText={errors?.new_password?.message}
        />
      </div>
      <div>
        <TextField
          {...register(
            'new_password_repeat',
            formValidation.new_password_repeat
          )}
          error={Boolean(errors?.new_password_repeat)}
          label="Email"
          value={new_password_repeat}
          onChange={(e) => setNew_password_repeat(e.target.value)}
          variant="filled"
          helperText={errors?.new_password_repeat?.message}
        />
      </div>
      <div>
        <Stack>
          {error || success ? (
            <Alert severity={error ? 'error' : success ? 'success' : 'info'}>
              {msg}
            </Alert>
          ) : null}
          {isLoading ? <CircularProgress /> : null}
          <Button type="submit" variant="contained" color="warning">
            Update Password
          </Button>
        </Stack>
      </div>
    </Box>
  );
};

const mapStateToProps = (state: StoreState) => ({});

export const UserProfileEditPassword = connect(mapStateToProps, {
  userUpdateProfileDetails,
})(_UserProfileEditPassword);

export default UserProfileEditPassword;
