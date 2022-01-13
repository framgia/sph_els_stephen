import { Dispatch } from 'redux';
import { ActionTypes } from '.';
import backend from '../api/backend';

export interface QuizItem {
  quiz_id?: number;
  question?: string;
}

export interface QuizItemsData {
  data?: QuizItem[];
  links?: any;
  meta?: any;
}

export interface QuizItemData {
  data?: QuizItem;
}

export interface AddQuizItemAction {
  type: ActionTypes.addQuizItem;
  payload: QuizItemData;
}

export const addQuizItem = (quizItem: QuizItem) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      const response = await backend.post<QuizItemData>(
        '/api/quiz_items/',
        quizItem
      );

      dispatch<AddQuizItemAction>({
        type: ActionTypes.addQuizItem,
        payload: response.data,
      });
    });
  };
};
