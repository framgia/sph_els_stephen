import { LockClosedIcon } from '@heroicons/react/outline';
import { AxiosError, AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import {
  UserAuthButton,
  UserAuthField,
  UserAuthForm,
  UserAuthHeader,
  UserAuthLoginExtra,
} from '.';
import backend from '../../api/backend';

interface FormInput {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const formValidation = {
  name: {
    required: {
      value: true,
      message: 'This field is required.',
    },
    maxLength: {
      value: 255,
      message: 'Email field max character up to 255 only.',
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
  password_confirmation: {
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

export const UserSignUp = () => {
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
        .post('/api/users/', data)
        .then((response: AxiosResponse) => {
          setCookies('user', response.data.data);
          setCookies('token', response.data.token);
          navigate('/signin');
        })
        .catch((err: AxiosError) => {
          setIsError(true);
        });
    });
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <UserAuthHeader>Register to Stephen's E-Learning System</UserAuthHeader>

        <UserAuthForm handleSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <UserAuthField
              label="Full Name"
              register={{ ...register('name', formValidation.name) }}
              rounded="t-md rounded-b-md"
            />
            <div>{errors.password?.message}</div>
          </div>

          <div className="rounded-md shadow-sm -space-y-px">
            <UserAuthField
              label="Email Address"
              register={{ ...register('email', formValidation.email) }}
              type="email"
              rounded="t-md"
            />
            <div>{errors.password?.message}</div>
            <UserAuthField
              label="Password"
              register={{ ...register('password', formValidation.password) }}
              type="password"
              rounded="none"
            />
            <div>{errors.password?.message}</div>
            <UserAuthField
              label="Password Confirmation"
              register={{
                ...register(
                  'password_confirmation',
                  formValidation.password_confirmation
                ),
              }}
              type="password"
              rounded="b-md"
            />
            <div>{errors.password?.message}</div>
          </div>

          <div>{isError ? 'Invalid Input' : ''}</div>
          <UserAuthButton label="Register" />
        </UserAuthForm>
      </div>
    </div>
  );
};

export default UserSignUp;
