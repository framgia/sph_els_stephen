import {
  AddQuizAction,
  DeleteQuizAction,
  FetchQuizzesAction,
  FetchUsersAction,
  FollowUserAction,
  GetQuizAction,
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
  | AddQuizItemAction;
