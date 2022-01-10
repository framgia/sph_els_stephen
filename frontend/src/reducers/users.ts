import { Action, ActionTypes, UsersData } from '../actions';

const followUserFunc = (state: UsersData, action: Action) => {
  let users = state.data || [];
  let to_follow = users.find((u) => u.id === action.payload);

  return {
    data: users.map((u) => {
      if (u.id == to_follow?.id) {
        return { ...to_follow, is_following: !to_follow.is_following };
      }
      return u;
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
