import { AxiosError, AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from '.';
import backend from '../api/backend';
import { User } from '../components/AdminUser';

export interface UsersData {
  data?: User[];
  links?: any;
  meta?: any;
}

export interface UserData {
  data?: User | null;
  token?: string;
}

export interface LearnedWord {
  question: string;
  answer: string;
}

export interface LearnedWordsData {
  data?: LearnedWord[];
}

// #region interfaces

export interface FetchUsersAction {
  type: ActionTypes.fetchUsers;
  payload: UsersData;
}

export interface FollowUserAction {
  type: ActionTypes.followUser;
  payload: number;
}

export interface UnfollowUserAction {
  type: ActionTypes.unfollowUser;
  payload: number;
}

export interface FetchUserWithFollowsAction {
  type: ActionTypes.fetchUserWithFollows;
  payload: UserData;
}

export interface FetchUserWithLogsAction {
  type: ActionTypes.fetchUserWithLogs;
  payload: UserData;
}

export interface UserSignInAction {
  type: ActionTypes.userSignIn;
  payload: UserData;
}

export interface UserSignUpAction {
  type: ActionTypes.userSignUp;
  payload: UserData;
}

export interface UserUpdateProfileAction {
  type: ActionTypes.userUpdateProfile;
  payload: UserData;
}

export interface CleanUpUserDataAction {
  type: ActionTypes.cleanUpUserData;
  payload: UserData;
}

export interface CleanUpUsersDataAction {
  type: ActionTypes.cleanUpUsersData;
  payload: UsersData;
}

export interface FetchLearnedWordsAction {
  type: ActionTypes.fetchLearnedWords;
  payload: LearnedWordsData;
}

// #endregion interfaces

// #region functions

// #region fetch users

export const fetchUsers = (data: { callback?: Function }) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      let { callback } = data;

      const response = await backend.get<UsersData>('/api/users');

      if (callback) callback();

      dispatch<FetchUsersAction>({
        type: ActionTypes.fetchUsers,
        payload: response.data,
      });
    });
  };
};

export const fetchUserWithFollows = (data: {
  token: string;
  id?: number;
  callback: Function;
}) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      let { token, id, callback } = data;

      const response = await backend.get<UserData>(
        `/api/follows${id ? `/${id}` : ''}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (callback) callback();

      dispatch<FetchUserWithFollowsAction>({
        type: ActionTypes.fetchUserWithFollows,
        payload: response.data,
      });
    });
  };
};

export const fetchUserWithLogs = (data: {
  id: number;
  token: string;
  callback: Function;
  errorCallback: Function;
  finallyCallback: Function;
}) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      let { id, token, callback, errorCallback, finallyCallback } = data;

      await backend
        .get<UserData>(`/api/activity_logs${id ? `/${id}` : ''}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (callback) callback(response);

          dispatch<FetchUserWithLogsAction>({
            type: ActionTypes.fetchUserWithLogs,
            payload: response.data,
          });
        })
        .catch((err) => {
          if (errorCallback) errorCallback(err);
        })
        .finally(() => {
          if (finallyCallback) finallyCallback();
        });
    });
  };
};

// #endregion fetch users

// #region user actions

export const followUser = (data: {
  user_id: number;
  token: string;
  callback: Function;
}) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      let { user_id, token, callback } = data;

      await backend.post<UserData>(
        '/api/follows',
        {
          to_id: user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      callback();

      dispatch<FollowUserAction>({
        type: ActionTypes.followUser,
        payload: user_id,
      });
    });
  };
};

export const unfollowUser = (data: {
  user_id: number;
  token: string;
  callback: Function;
}) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      let { user_id, token, callback } = data;

      await backend.post<UserData>(
        '/api/follows',
        {
          _method: 'DELETE',
          to_id: user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      callback();

      dispatch<UnfollowUserAction>({
        type: ActionTypes.unfollowUser,
        payload: user_id,
      });
    });
  };
};

export const userUpdateProfileDetails = (data: {
  user_id: number;
  name: string;
  email: string;
  callback: Function;
  errorCallback: Function;
  finallyCallback: Function;
}) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      let { user_id, name, email, callback, errorCallback, finallyCallback } =
        data;

      await backend
        .put<UserData>(`/api/users/${user_id}`, {
          name,
          email,
        })
        .then((response: AxiosResponse) => {
          callback(response);

          dispatch<UserUpdateProfileAction>({
            type: ActionTypes.userUpdateProfile,
            payload: response.data,
          });
        })
        .catch((err: AxiosError) => {
          errorCallback(err);
        })
        .finally(() => finallyCallback());
    });
  };
};

export const userUpdateProfileAvatar = (data: {
  user_id: number;
  formdata: FormData;
  callback: Function;
  errorCallback: Function;
  finallyCallback: Function;
}) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      let { user_id, formdata, callback, errorCallback, finallyCallback } =
        data;

      await backend
        .post<UserData>(`/api/users/${user_id}`, formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response: AxiosResponse) => {
          callback(response);

          dispatch<UserUpdateProfileAction>({
            type: ActionTypes.userUpdateProfile,
            payload: response.data,
          });
        })
        .catch((err: AxiosError) => {
          errorCallback(err);
        })
        .finally(() => finallyCallback());
    });
  };
};

export const userUpdatePassword = (data: {
  token: string;
  password: string;
  new_password: string;
  new_password_confirmation: string;
  callback?: Function;
  errorCallback?: Function;
  finallyCallback?: Function;
}) => {
  backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
    let {
      token,
      password,
      new_password,
      new_password_confirmation,
      callback,
      errorCallback,
      finallyCallback,
    } = data;

    await backend
      .post<UserData>(
        `/api/users/update_password`,
        {
          password,
          new_password,
          new_password_confirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: AxiosResponse) => {
        if (callback) callback(response);
      })
      .catch((err: AxiosError) => {
        if (errorCallback) errorCallback(err);
      })
      .finally(() => {
        if (finallyCallback) finallyCallback();
      });
  });
};

export const fetchLearnedWords = (data: {
  token: string;
  callback?: Function;
  errorCallback?: Function;
  finallyCallback?: Function;
}) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      let { token, callback, errorCallback, finallyCallback } = data;

      await backend
        .get<LearnedWordsData>(`/api/learned_words`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response: AxiosResponse) => {
          if (callback) callback(response);

          dispatch<FetchLearnedWordsAction>({
            type: ActionTypes.fetchLearnedWords,
            payload: response.data,
          });
        })
        .catch((err: AxiosError) => {
          if (errorCallback) errorCallback(err);
        })
        .finally(() => {
          if (finallyCallback) finallyCallback();
        });
    });
  };
};

// #endregion user actions

// #region user auth

export const userSignIn = (data: {
  email: number;
  password: string;
  callback?: Function;
  errorCallback?: Function;
}) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      let { email, password, callback, errorCallback } = data;

      await backend
        .post<UserData>('/api/login', {
          email,
          password,
        })
        .then((response) => {
          if (callback) callback(response);

          dispatch<UserSignInAction>({
            type: ActionTypes.userSignIn,
            payload: response.data,
          });
        })
        .catch((error) => {
          if (errorCallback) errorCallback(error);
        });
    });
  };
};

export const userSignUp = (data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  callback?: Function;
  errorCallback?: Function;
}) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      let {
        name,
        email,
        password,
        password_confirmation,
        callback,
        errorCallback,
      } = data;

      await backend
        .post<UserData>('/api/users', {
          name,
          email,
          password,
          password_confirmation,
        })
        .then((response) => {
          if (callback) callback(response);

          dispatch<UserSignUpAction>({
            type: ActionTypes.userSignUp,
            payload: response.data,
          });
        })
        .catch((error) => {
          if (errorCallback) errorCallback(error);
        });
    });
  };
};

export const userSignOut = (data: {
  token: string;
  callback?: Function;
  errorCallback?: Function;
  finallyCallback?: Function;
}) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      let { token, callback, errorCallback, finallyCallback } = data;

      await backend
        .post(
          '/api/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (callback) callback(response);
        })
        .catch((error) => {
          if (errorCallback) errorCallback(error);
        })
        .finally(() => {
          if (finallyCallback) finallyCallback();
        });
    });
  };
};

// #endregion user auth

// #region cleanup

export const userDataCleanup = () => {
  return async (dispatch: Dispatch) => {
    dispatch<CleanUpUserDataAction>({
      type: ActionTypes.cleanUpUserData,
      payload: { data: null },
    });
  };
}

export const usersDataCleanup = () => {
  return async (dispatch: Dispatch) => {
    dispatch<CleanUpUsersDataAction>({
      type: ActionTypes.cleanUpUsersData,
      payload: { data: [] },
    });
  };
}

// #endregion cleanup

// #endregion functions
