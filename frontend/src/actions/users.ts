import { Dispatch } from 'redux';
import { ActionTypes } from '.';
import backend from '../api/backend';
import { User } from '../components/AdminUser';
import { StoreState } from '../reducers';

export interface UsersData {
  data?: User[];
  links?: any;
  meta?: any;
}

export interface UserData {
  data?: User;
}

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

export const fetchUsers = () => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      const response = await backend.get<UsersData>('/api/users/');

      dispatch<FetchUsersAction>({
        type: ActionTypes.fetchUsers,
        payload: response.data,
      });
    });
  };
};

export const fetchUserWithFollows = (
  token: string,
  id?: number,
  callback: Function = () => {}
) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      const response = await backend.get<UserData>(`/api/follows/${id ?? ''}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      callback();

      dispatch<FetchUserWithFollowsAction>({
        type: ActionTypes.fetchUserWithFollows,
        payload: response.data,
      });
    });
  };
};

export const followUser = (data: {
  user_id: number;
  token: string;
  callback: Function;
}) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      let { user_id, token, callback } = data;

      const response = await backend.post<UserData>(
        '/api/follows/',
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

      const response = await backend.post<UserData>(
        '/api/follows/',
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
