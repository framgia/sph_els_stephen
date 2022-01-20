import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { userUpdateProfileDetails } from '../../actions';
import { handleWhiteSpace } from '../UserAuth';

import {
  Box,
  TextField,
  Stack,
  Alert,
  CircularProgress,
  Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { AxiosResponse, AxiosError } from 'axios';
import { connect } from 'react-redux';

export interface ProfileEditInput {
  name: string;
  email: string;
}

const formValidation = {
  name: {
    required: {
      value: true,
      message: 'This field is required.',
    },
    minLength: {
      value: 10,
      message: 'Full Name has minimum length of 10',
    },
    maxLength: {
      value: 255,
      message: 'Full Name field max character up to 255 only.',
    },
  },
  email: {
    required: {
      value: true,
      message: 'This field is required.',
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

export const _UserProfileEditDetails = ({
  userUpdateProfileDetails,
}: Props) => {
  const [cookies, setCookies] = useCookies();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileEditInput>();

  useEffect(() => {
    let _name: string = cookies.user.name;
    let _email: string = cookies.user.email;
    setName(_name);
    setEmail(_email);
    reset({ name: _name, email: _email });
    return () => {};
  }, [cookies, reset]);

  const onSubmit = (data: ProfileEditInput) => {
    setIsLoading(true);
    setError(false);
    setSuccess(false);
    let profileData = {
      user_id: cookies.user.id,
      name: data.name,
      email: data.email,
      callback: (response: AxiosResponse) => {
        setSuccess(true);
        setMsg('Profile Updated Successfully');
        let data = response.data?.data;
        setCookies('user', data, { path: '/' });
      },
      errorCallback: (err: AxiosError) => {
        try {
          setError(true);
          let errordata = err.response?.data;
          setMsg(
            errordata?.error?.message?.email ||
              errordata?.error?.message?.name ||
              errordata?.error?.message ||
              'Something went wrong.'
          );
        } catch {}
      },
      finallyCallback: () => {
        setIsLoading(false);
      },
    };

    userUpdateProfileDetails(profileData);
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
          {...register('name', formValidation.name)}
          error={Boolean(errors?.name)}
          label="Full Name"
          value={name}
          onChange={(e) => setName(handleWhiteSpace(e.target.value))}
          variant="filled"
          helperText={errors?.name?.message}
        />
      </div>
      <div>
        <TextField
          {...register('email', formValidation.email)}
          error={Boolean(errors?.email)}
          label="Email"
          value={email}
          onChange={(e) => setEmail(handleWhiteSpace(e.target.value))}
          variant="filled"
          helperText={errors?.email?.message}
        />
      </div>
      <div>
        <Stack>
          {error || success ? (
            <Alert severity={error ? 'error' : success ? 'success' : 'info'}>
              {msg}
            </Alert>
          ) : null}
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" variant="contained">
              Update
            </Button>
          )}
        </Stack>
      </div>
    </Box>
  );
};

const mapStateToProps = (): {} => {
  return {};
};

export const UserProfileEditDetails = connect(mapStateToProps, {
  userUpdateProfileDetails,
})(_UserProfileEditDetails);

export default UserProfileEditDetails;
