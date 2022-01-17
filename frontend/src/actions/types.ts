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
import {
  AddQuizItemAction,
  FetchQuizItemsAction,
  SelectChoiceAction,
} from './quizItems';

export enum ActionTypes {
  fetchQuizzes,
  fetchQuizItems,
  selectChoice,
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
  | FetchQuizItemsAction
  | SelectChoiceAction
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
