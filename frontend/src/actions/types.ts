import {
  AddQuizAction,
  DeleteQuizAction,
  FetchQuizzesAction,
  FetchUsersAction,
  FetchUserWithFollowsAction,
  FollowUserAction,
  GetQuizAction,
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
  | AddQuizItemAction;
