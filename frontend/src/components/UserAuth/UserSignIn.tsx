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
import { AxiosResponse } from 'axios';
import { CircularProgress, Stack } from '@mui/material';
import { connect } from 'react-redux';
import { userSignIn } from '../../actions';

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

interface Props {
  userSignIn: Function;
}

export const _UserSignIn = ({ userSignIn }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [_, setCookies] = useCookies(); // eslint-disable-line -- need to destructure this way

  const onSubmit = (data: FormInput) => {
    setIsError(false);
    setLoading(true);
    let signInData = {
      email: data.email,
      password: data.password,
      callback: (response: AxiosResponse) => {
        setCookies('user', response.data.data, { path: '/' });
        setCookies('token', response.data.token, { path: '/' });
        setLoading(false);
        navigate('/');
      },
      errorCallback: () => {
        setIsError(true);
      },
    };

    userSignIn(signInData);
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
          {loading ? (
            <Stack alignItems="center">
              <CircularProgress />
            </Stack>
          ) : (
            <UserAuthButton label="Sign In" />
          )}
        </UserAuthForm>
      </div>
    </div>
  );
};

const mapStateToProps = (): {} => {
  return {};
};

export const UserSignIn = connect(mapStateToProps, { userSignIn })(_UserSignIn);

export default UserSignIn;
