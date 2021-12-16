import {
  AddQuizAction,
  DeleteQuizAction,
  FetchQuizzesAction,
  FetchUsersAction,
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
  addQuizItem,
}

export type Action =
  | FetchQuizzesAction
  | AddQuizAction
  | GetQuizAction
  | UpdateQuizAction
  | DeleteQuizAction
  | FetchUsersAction
  | AddQuizItemAction;
