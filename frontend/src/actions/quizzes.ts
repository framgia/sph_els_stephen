import { Dispatch } from 'redux';
import { Quiz } from '../components/AdminQuiz';
import { ActionTypes, UserData } from '.';
import backend from '../api/backend';

export interface QuizzesData {
  data?: Quiz[];
  links?: any;
  meta?: any;
}

export interface QuizData {
  data?: Quiz;
}

export interface FetchQuizzesAction {
  type: ActionTypes.fetchQuizzes;
  payload: QuizzesData;
}

export interface AddQuizAction {
  type: ActionTypes.addQuiz;
  payload: QuizData;
}

export interface GetQuizAction {
  type: ActionTypes.getQuiz;
  payload: QuizData;
}

export interface UpdateQuizAction {
  type: ActionTypes.updateQuiz;
  payload: QuizData;
}

export interface DeleteQuizAction {
  type: ActionTypes.deleteQuiz;
  payload: number;
}

export interface FetchQuizLogsAction {
  type: ActionTypes.fetchQuizLogs;
  payload: UserData;
}

export interface TakeQuizAction {
  type: ActionTypes.takeQuiz;
  payload: number;
}

export const fetchQuizzes = (data: { search: string; callback: Function }) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      let { search, callback } = data;

      const response = await backend.get<QuizzesData>(
        search !== '' ? `/api/quizzes?search=${search ?? ''}` : `/api/quizzes/`
      );

      if (callback) callback();

      dispatch<FetchQuizzesAction>({
        type: ActionTypes.fetchQuizzes,
        payload: response.data,
      });
    });
  };
};

export const addQuiz = (data: { quiz: Quiz; callback: Function }) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      let { quiz, callback } = data;
      await backend.post<QuizData>('/api/quizzes/', quiz).then((response) => {
        if (callback) callback();

        dispatch<AddQuizAction>({
          type: ActionTypes.addQuiz,
          payload: response.data,
        });
      });
    });
  };
};

export const getQuiz = (quizId: number) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      const response = await backend.get<QuizData>(`/api/quizzes/${quizId}`);

      dispatch<GetQuizAction>({
        type: ActionTypes.getQuiz,
        payload: response.data,
      });
    });
  };
};

export const deleteQuiz = (data: { quizId: number; callback?: Function }) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      let { quizId, callback } = data;

      await backend.delete(`/api/quizzes/${quizId}`).then((response) => {
        if (callback) callback();

        dispatch<DeleteQuizAction>({
          type: ActionTypes.deleteQuiz,
          payload: quizId,
        });
      });
    });
  };
};

export const updateQuiz = (data: {
  quizId: string | undefined;
  quiz: Quiz;
  callback: Function;
}) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      let { quizId, quiz, callback } = data;

      await backend
        .patch<QuizData>(`/api/quizzes/${quizId}`, quiz)
        .then((response) => {
          if (callback) callback();

          dispatch<UpdateQuizAction>({
            type: ActionTypes.updateQuiz,
            payload: response.data,
          });
        });
    });
  };
};

export const fetchQuizLogs = (data: { token: string; callback: Function }) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      let { token, callback } = data;

      const response = await backend.get<UserData>(`/api/quiz_logs/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      callback();

      dispatch<FetchQuizLogsAction>({
        type: ActionTypes.fetchQuizLogs,
        payload: response.data,
      });
    });
  };
};

export const takeQuiz = (
  quiz_id: number,
  token: string,
  callback: Function = () => {}
) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      await backend.post<UserData>(
        `/api/quiz_logs/`,
        {
          quiz_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      callback();

      dispatch<TakeQuizAction>({
        type: ActionTypes.takeQuiz,
        payload: quiz_id,
      });
    });
  };
};

export const submitQuiz = (data: {
  quiz_id: string | undefined;
  choices_id: number[];
  token: string;
  callback?: Function;
  errorcallback?: Function;
  finallyCallback?: Function;
}) => {
  backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
    let {
      quiz_id,
      choices_id,
      token,
      callback,
      errorcallback,
      finallyCallback,
    } = data;

    await backend
      .post<UserData>(
        `/api/quiz_logs/${quiz_id}/submit`,
        {
          choices_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (callback) callback(response);
      })
      .catch((error) => {
        if (errorcallback) errorcallback(error);
      })
      .finally(() => {
        if (finallyCallback) finallyCallback();
      });
  });
};
