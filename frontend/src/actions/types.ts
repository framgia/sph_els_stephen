import {
  AddQuizAction,
  CleanUpUserDataAction,
  CleanUpUsersDataAction,
  DeleteQuizAction,
  FetchQuizLogsAction,
  FetchQuizzesAction,
  FetchUsersAction,
  FetchUserWithFollowsAction,
  FetchUserWithLogsAction,
  FollowUserAction,
  GetQuizAction,
  TakeQuizAction,
  UnfollowUserAction,
  UpdateQuizAction,
  UserSignInAction,
  UserSignUpAction,
  UserUpdateProfileAction,
} from '.';
import { AddQuizItemAction } from './quizItems';

export enum ActionTypes {
  fetchQuizzes,
  addQuiz,
  getQuiz,
  updateQuiz,
  deleteQuiz,
  fetchUsers,
  followUser,
  unfollowUser,
  fetchUserWithFollows,
  fetchUserWithLogs,
  addQuizItem,
  takeQuiz,
  fetchQuizLogs,
  userSignIn,
  userSignUp,
  userSignOut,
  userUpdateProfile,
  cleanUpUserData,
  cleanUpUsersData,
}

export type Action =
  | FetchQuizzesAction
  | AddQuizAction
  | GetQuizAction
  | UpdateQuizAction
  | DeleteQuizAction
  | FetchUsersAction
  | FollowUserAction
  | UnfollowUserAction
  | FetchUserWithFollowsAction
  | FetchUserWithLogsAction
  | AddQuizItemAction
  | TakeQuizAction
  | FetchQuizLogsAction
  | UserSignInAction
  | UserSignUpAction
  | UserUpdateProfileAction
  | CleanUpUserDataAction
  | CleanUpUsersDataAction;
