import {
  AddQuizAction,
  DeleteQuizAction,
  FetchQuizzesAction,
  FetchUsersAction,
  FetchUserWithFollowsAction,
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
  | FetchUserWithFollowsAction
  | AddQuizItemAction;
