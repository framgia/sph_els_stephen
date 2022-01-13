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

export const addQuiz = (quiz: Quiz) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      const response = await backend.post<QuizData>('/api/quizzes/', quiz);

      dispatch<AddQuizAction>({
        type: ActionTypes.addQuiz,
        payload: response.data,
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

export const updateQuiz = (quizId: string | undefined, quiz: Quiz) => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      const response = await backend.patch<QuizData>(
        `/api/quizzes/${quizId}`,
        quiz
      );

      dispatch<UpdateQuizAction>({
        type: ActionTypes.updateQuiz,
        payload: response.data,
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
