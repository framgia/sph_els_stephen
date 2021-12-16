import { Action, ActionTypes, UsersData } from '../actions';

export const usersDataReducer = (
  state: UsersData = { data: [], links: {}, meta: {} },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.fetchUsers:
      return action.payload;
    default:
      return state;
  }
};
