import {
  AddQuizAction,
  CleanUpUserDataAction,
  CleanUpUsersDataAction,
  DeleteQuizAction,
  FetchLearnedWordsAction,
  FetchQuizLogsAction,
  FetchQuizResultAction,
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
  ClearQuizResultAction,
  FetchQuizItemsAction,
  SelectChoiceAction,
} from './quizItems';

export enum ActionTypes {
  fetchQuizzes,
  fetchQuizItems,
  fetchQuizResult,
  fetchLearnedWords,
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
  clearQuizResult,
}

export type Action =
  | FetchQuizzesAction
  | FetchQuizItemsAction
  | FetchQuizResultAction
  | FetchLearnedWordsAction
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
  | CleanUpUsersDataAction
  | ClearQuizResultAction;
