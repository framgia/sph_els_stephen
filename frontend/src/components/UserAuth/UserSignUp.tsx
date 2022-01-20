import React, { useState } from 'react';
import { UserAuthButton, UserAuthField, UserAuthForm, UserAuthHeader } from '.';
import { userSignUp } from '../../actions';
import { handleWhiteSpace } from './';

import { AxiosError, AxiosResponse } from 'axios';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';

import { Alert, CircularProgress, Stack } from '@mui/material';

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
    minLength: {
      value: 10,
      message: 'Name field must at least be 10 characters.',
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

interface Props {
  userSignUp: Function;
}

export const _UserSignUp = ({ userSignUp }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');

  const navigate = useNavigate();

  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [_, setCookies] = useCookies(); // eslint-disable-line -- need to destructure this way

  const onSubmit = (data: FormInput) => {
    setIsError(false);
    setIsLoading(true);
    let signUpData = {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      callback: (response: AxiosResponse) => {
        setCookies('user', response.data.data, { path: '/' });
        setCookies('token', response.data.token, { path: '/' });
        setIsLoading(false);
        navigate('/');
      },
      errorCallback: (error: AxiosError) => {
        setIsError(true);
        setErrorMsg(
          error?.response?.data?.error?.message?.name ||
            error?.response?.data?.error?.message?.email ||
            error?.response?.data?.error?.message?.password ||
            error?.response?.data?.error?.message ||
            'Something went wrong.'
        );
        setIsLoading(false);
      },
    };

    userSignUp(signUpData);
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
              value={name}
              onChange={(e: any) => setName(handleWhiteSpace(e.target.value))}
              rounded="t-md rounded-b-md"
              errormsg={errors.name?.message}
            />
          </div>

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
              value={password}
              onChange={(e: any) =>
                setPassword(handleWhiteSpace(e.target.value))
              }
              type="password"
              rounded="none"
              errormsg={errors.password?.message}
            />
            <UserAuthField
              label="Password Confirmation"
              register={{
                ...register('password_confirmation', {
                  ...formValidation.password_confirmation,
                  validate: (value) =>
                    value === password ||
                    'Password confirmation does not match',
                }),
              }}
              value={password_confirmation}
              onChange={(e: any) =>
                setPassword_confirmation(handleWhiteSpace(e.target.value))
              }
              type="password"
              rounded="b-md"
              errormsg={errors.password_confirmation?.message}
            />
          </div>

          {isError ? <Alert severity={'error'}>{errorMsg}</Alert> : null}
          {isLoading ? (
            <Stack alignItems="center">
              <CircularProgress />
            </Stack>
          ) : (
            <UserAuthButton label="Register" />
          )}
        </UserAuthForm>
      </div>
    </div>
  );
};

const mapStateToProps = (): {} => {
  return {};
};

export const UserSignUp = connect(mapStateToProps, { userSignUp })(_UserSignUp);

export default UserSignUp;
