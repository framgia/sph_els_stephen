import {
  AddQuizAction,
  DeleteQuizAction,
  FetchQuizLogsAction,
  FetchQuizzesAction,
  FetchUsersAction,
  FetchUserWithFollowsAction,
  FollowUserAction,
  GetQuizAction,
  TakeQuizAction,
  UnfollowUserAction,
  UpdateQuizAction,
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
  addQuizItem,
  takeQuiz,
  fetchQuizLogs,
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
  | AddQuizItemAction
  | TakeQuizAction
  | FetchQuizLogsAction;
