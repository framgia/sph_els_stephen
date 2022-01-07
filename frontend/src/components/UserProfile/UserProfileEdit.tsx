import React, { useEffect, useState } from 'react';
import { SampleUsers } from '../AdminUser';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import backend from '../../api/backend';
import { AxiosError, AxiosResponse } from 'axios';

import { styled } from '@mui/material/styles';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useNavigate } from 'react-router';

const Input = styled('input')({
  display: 'none',
});

interface FormInput {
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

const UserProfileEdit = (props: Props): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let _name: string = cookies.user.name;
    let _email: string = cookies.user.email;
    setName(_name);
    setEmail(_email);
    return () => {};
  }, []);

  const onSubmit = (data: FormInput) => {
    setLoading(true);
    setError(false);
    backend.get('/sanctum/csrf-cookie').then((csrf_response) => {
      backend
        .put(`/api/users/${cookies.user.id}`, data)
        .then((response: AxiosResponse) => {
          navigate('/');
        })
        .catch((err: AxiosError) => {
          setError(true);
          let errordata = err.response?.data;
          setErrormsg(errordata?.error?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return (
    <div className="container mx-auto px-24 py-8">
      <Stack direction="row">
        <div className="mr-4 px-10">
          <img
            className="mx-auto mt-4"
            src={SampleUsers[0].avatar}
            width={200}
            height={200}
            alt="Profile Image"
          />
          <div className="mx-auto mt-5">
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
              />
              <Button
                variant="contained"
                component="span"
                endIcon={<PhotoCamera />}
              >
                Upload Photo
              </Button>
            </label>
          </div>
        </div>

        <div>
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
                {error ? <Alert severity="error">{errormsg}</Alert> : null}
                {loading ? <CircularProgress /> : null}
                <Button type="submit" variant="contained">
                  Update
                </Button>
              </Stack>
            </div>
          </Box>
        </div>
      </Stack>
    </div>
  );
};

export default UserProfileEdit;
