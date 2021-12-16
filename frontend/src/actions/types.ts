import {
  AddQuizAction,
  DeleteQuizAction,
  FetchQuizzesAction,
  GetQuizAction,
  UpdateQuizAction,
} from '.';

export enum ActionTypes {
  fetchQuizzes,
  addQuiz,
  getQuiz,
  updateQuiz,
  deleteQuiz,
}

export type Action =
  | FetchQuizzesAction
  | AddQuizAction
  | GetQuizAction
  | UpdateQuizAction
  | DeleteQuizAction;
