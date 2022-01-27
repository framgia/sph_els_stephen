import { Dispatch } from 'redux';
import { ActionTypes } from '.';
import backend from '../api/backend';

export interface Choice {
  id?: number;
  quiz_item_id?: number;
  choice?: string;
}

export interface QuizItem {
  id?: number;
  quiz_id?: number;
  question?: string;
  choices?: Choice[];
  quiz_title?: string;
  answer?: number;
  correct?: number;
}

// #region interfaces

export interface QuizItemsData {
  data?: QuizItem[];
  links?: any;
  meta?: any;
}

export interface QuizItemData {
  data?: QuizItem;
}

export interface SelectedChoicesData {
  quiz_id?: number;
  choices_id?: number[];
}

export interface QuizAnswersData {
  quizzes?: SelectedChoicesData[];
}

export interface FetchQuizItemsAction {
  type: ActionTypes.fetchQuizItems;
  payload: QuizItemsData;
}

export interface SelectChoiceAction {
  type: ActionTypes.selectChoice;
  payload: SelectedChoicesData;
}

export interface AddQuizItemAction {
  type: ActionTypes.addQuizItem;
  payload: QuizItemData;
}

export interface FetchQuizResultAction {
  type: ActionTypes.fetchQuizResult;
  payload: QuizItemsData;
}

export interface ClearQuizResultAction {
  type: ActionTypes.clearQuizResult;
  payload: QuizItemsData;
}

// #endregion interfaces

// #region actions

export const fetchQuizItems = (data: {
  token: string;
  quiz_id: number;
  callback?: Function;
  errorCallback?: Function;
  finallyCallback?: Function;
}) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      let { token, quiz_id, callback, errorCallback, finallyCallback } = data;

      await backend
        .get<QuizItemsData>(`/api/quizzes/${quiz_id}/quiz_items`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (callback) callback(response);

          dispatch<FetchQuizItemsAction>({
            type: ActionTypes.fetchQuizItems,
            payload: response.data,
          });
        })
        .catch((error) => {
          if (errorCallback) errorCallback(error);
        })
        .finally(() => {
          if (finallyCallback) finallyCallback();
        });
    });
  };
};

export const fetchQuizResults = (data: {
  token: string;
  quiz_id: string | undefined;
  callback?: Function;
  errorCallback?: Function;
  finallyCallback?: Function;
}) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      let { token, quiz_id, callback, errorCallback, finallyCallback } = data;

      await backend
        .get<QuizItemsData>(`/api/quizzes/${quiz_id}/results`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (callback) callback();

          dispatch<FetchQuizResultAction>({
            type: ActionTypes.fetchQuizResult,
            payload: response.data,
          });
        })
        .catch((error) => {
          if (errorCallback) errorCallback(error);
        })
        .finally(() => {
          if (finallyCallback) finallyCallback();
        });
    });
  };
};

export const clearQuizResult = () => {
  return (dispatch: Dispatch) => {
    let payloadData: QuizItemsData = {};

    dispatch<ClearQuizResultAction>({
      type: ActionTypes.clearQuizResult,
      payload: payloadData,
    });
  };
};

export const selectChoice = (data: { quiz_id: number; choice_id: number }) => {
  return (dispatch: Dispatch) => {
    let { quiz_id, choice_id } = data;

    let payloadData: SelectedChoicesData = { quiz_id, choices_id: [choice_id] };

    dispatch<SelectChoiceAction>({
      type: ActionTypes.selectChoice,
      payload: payloadData,
    });
  };
};

export const addQuizItem = (data: {
  quizItem: QuizItem;
  callback: Function;
}) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      let { quizItem, callback } = data;

      await backend
        .post<QuizItemData>('/api/quiz_items', quizItem)
        .then((response) => {
          if (callback) callback();

          dispatch<AddQuizItemAction>({
            type: ActionTypes.addQuizItem,
            payload: response.data,
          });
        });
    });
  };
};

// #region actions
