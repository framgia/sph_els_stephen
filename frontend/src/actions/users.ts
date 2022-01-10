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

export const fetchUserWithFollows = (token: string) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      const response = await backend.get<UserData>('/api/follows/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch<FetchUserWithFollowsAction>({
        type: ActionTypes.fetchUserWithFollows,
        payload: response.data,
      });
    });
  };
};

export const followUser = (userId: number, token: string) => {
  return (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      const response = await backend.post<UserData>(
        '/api/follows/',
        {
          to_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch<FollowUserAction>({
        type: ActionTypes.followUser,
        payload: userId,
      });
    });
  };
};
