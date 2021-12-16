import {
  AddQuizAction,
  DeleteQuizAction,
  FetchQuizzesAction,
  FetchUsersAction,
  GetQuizAction,
  UpdateQuizAction,
} from '.';

export enum ActionTypes {
  fetchQuizzes,
  addQuiz,
  getQuiz,
  updateQuiz,
  deleteQuiz,
  fetchUsers,
}

export type Action =
  | FetchQuizzesAction
  | AddQuizAction
  | GetQuizAction
  | UpdateQuizAction
  | DeleteQuizAction
  | FetchUsersAction;
