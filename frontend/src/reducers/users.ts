import {
  Action,
  ActionTypes,
  LearnedWordsData,
  UserData,
  UsersData,
} from '../actions';

const followUserFunc = (state: UsersData, action: Action) => {
  let users = state.data || [];
  let to_follow = users.find((user) => user.id === action.payload);

  return {
    data: users.map((user) => {
      if (user.id === to_follow?.id) {
        return { ...to_follow, is_following: !to_follow.is_following };
      }
      return user;
    }),
  };
};

const takeQuizFunc = (state: UserData, action: Action) => {
  return state;
};

export const userDataReducer = (state: UserData = {}, action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchUserWithFollows:
      return action.payload;
    case ActionTypes.fetchUserWithLogs:
      return action.payload;
    case ActionTypes.fetchQuizLogs:
      return action.payload;
    case ActionTypes.takeQuiz:
      return takeQuizFunc(state, action);
    case ActionTypes.cleanUpUserData:
      return action.payload;
    default:
      return state;
  }
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
    case ActionTypes.cleanUpUsersData:
      return action.payload;
    default:
      return state;
  }
};

export const learnedWordsReducer = (
  state: LearnedWordsData = {},
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.fetchLearnedWords:
      return action.payload;
    default:
      return state;
  }
};
