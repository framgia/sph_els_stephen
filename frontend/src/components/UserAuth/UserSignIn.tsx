import React, { useState } from 'react';
import {
  UserAuthButton,
  UserAuthField,
  UserAuthForm,
  UserAuthHeader,
  UserAuthLoginExtra,
} from '.';

import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { AxiosResponse, AxiosError } from 'axios';
import backend from '../../api/backend';

interface FormInput {
  email: string;
  password: string;
}

const formValidation = {
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
  password: {
    required: {
      value: true,
      message: 'This field is required.',
    },
    maxLength: {
      value: 255,
      message: 'Password field max character up to 255 only.',
    },
    minLength: {
      value: 6,
      message: 'Password field min character is 6.',
    },
  },
};

export const UserSignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [cookies, setCookies] = useCookies();

  const onSubmit = (data: FormInput) => {
    setIsError(false);
    backend.get('/sanctum/csrf-cookie').then((csrf_response) => {
      backend
        .post('/api/login', data)
        .then((response: AxiosResponse) => {
          setCookies('user', response.data.data);
          setCookies('token', response.data.token);
          navigate('/');
        })
        .catch((err: AxiosError) => {
          console.error(err);
          setIsError(true);
        });
    });
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <UserAuthHeader>Sign in to your Account</UserAuthHeader>

        <UserAuthForm handleSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <UserAuthField
              label="Email Address"
              register={{ ...register('email', formValidation.email) }}
              type="email"
              rounded="t-md"
              errormsg={errors.email?.message}
            />
            <UserAuthField
              label="Password"
              register={{ ...register('password', formValidation.password) }}
              autocomplete="current-password"
              type="password"
              rounded="b-md"
              errormsg={errors.password?.message}
            />
          </div>

          <UserAuthLoginExtra />

          <div>{isError ? 'Invalid Input' : ''}</div>
          <UserAuthButton label="Sign In" />
        </UserAuthForm>
      </div>
    </div>
  );
};

export default UserSignIn;
