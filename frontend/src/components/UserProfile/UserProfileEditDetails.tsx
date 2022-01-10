import styled from '@emotion/styled';
import { AxiosResponse, AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import backend from '../../api/backend';

import {
  Box,
  TextField,
  Stack,
  Alert,
  CircularProgress,
  Button,
} from '@mui/material';

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

interface Props {}

export const UserProfileEditDetails = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileEditInput>();

  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let _name: string = cookies.user.name;
    let _email: string = cookies.user.email;
    setName(_name);
    setEmail(_email);
    return () => {};
  }, []);

  const onSubmit = (data: ProfileEditInput) => {
    setLoading(true);
    setError(false);
    setSuccess(false);
    backend.get('/sanctum/csrf-cookie').then((csrf_response) => {
      backend
        .put(`/api/users/${cookies.user.id}`, data)
        .then((response: AxiosResponse) => {
          setSuccess(true);
          setMsg('Profile Updated Successfully');
          let data = response.data?.data;
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
          onChange={(e) => setName(e.target.value)}
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
          onChange={(e) => setEmail(e.target.value)}
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
          {loading ? <CircularProgress /> : null}
          <Button type="submit" variant="contained">
            Update
          </Button>
        </Stack>
      </div>
    </Box>
  );
};

export default UserProfileEditDetails;