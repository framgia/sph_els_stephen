import { Action, ActionTypes, UsersData } from '../actions';

const followUserFunc = (state: UsersData, action: Action) => {
  let users = state.data || [];
  let to_follow = users.find((user) => user.id === action.payload);

  return {
    data: users.map((user) => {
      if (user.id == to_follow?.id) {
        return { ...to_follow, following: !to_follow.following };
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
    default:
      return state;
  }
};
