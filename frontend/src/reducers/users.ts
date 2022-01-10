import { Action, ActionTypes, UserData, UsersData } from '../actions';

export const userDataReducer = (state: UserData = {}, action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchUserWithFollows:
      return action.payload;
    default:
      return state;
  }
};

const followUserFunc = (state: UsersData, action: Action) => {
  let users = state.data || [];
  let to_follow = users.find((user) => user.id === action.payload);

  return {
    data: users.map((user) => {
      if (user.id == to_follow?.id) {
        return { ...to_follow, is_following: !to_follow.is_following };
      }
      return user;
    }),
  };
};

export const usersDataReducer = (
  state: UsersData = { data: [], links: {}, meta: {} },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.fetchUsers:
      return action.payload;
    case ActionTypes.followUser:
      return followUserFunc(state, action);
    case ActionTypes.unfollowUser:
      return followUserFunc(state, action);
    default:
      return state;
  }
};
