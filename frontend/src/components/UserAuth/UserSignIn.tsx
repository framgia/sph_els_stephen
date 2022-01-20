import React, { useState } from 'react';
import {
  UserAuthButton,
  UserAuthField,
  UserAuthForm,
  UserAuthHeader,
  handleWhiteSpace,
} from '.';

import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { AxiosError, AxiosResponse } from 'axios';
import { Alert, CircularProgress, Stack } from '@mui/material';
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [_, setCookies] = useCookies(); // eslint-disable-line -- need to destructure this way

  const onSubmit = (data: FormInput) => {
    setIsError(false);
    setIsLoading(true);
    let signInData = {
      email: data.email,
      password: data.password,
      callback: (response: AxiosResponse) => {
        setCookies('user', response.data.data, { path: '/' });
        setCookies('token', response.data.token, { path: '/' });
        setIsLoading(false);
        navigate('/');
      },
      errorCallback: (error: AxiosError) => {
        setIsError(true);
        setErrorMsg(
          error?.response?.data?.error?.message?.email ||
            error?.response?.data?.error?.message?.password ||
            error?.response?.data?.error?.message ||
            'Something went wrong.'
        );
        setIsLoading(false);
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
              value={email}
              onChange={(e: any) => setEmail(handleWhiteSpace(e.target.value))}
              rounded="t-md"
              errormsg={errors.email?.message}
            />
            <UserAuthField
              label="Password"
              register={{ ...register('password', formValidation.password) }}
              autocomplete="current-password"
              value={password}
              onChange={(e: any) =>
                setPassword(handleWhiteSpace(e.target.value))
              }
              type="password"
              rounded="b-md"
              errormsg={errors.password?.message}
            />
          </div>

          {isError ? <Alert severity={'error'}>{errorMsg}</Alert> : null}
          {isLoading ? (
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
