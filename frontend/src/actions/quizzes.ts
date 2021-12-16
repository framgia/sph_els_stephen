import { Dispatch } from 'redux';
import { Quiz } from '../components/AdminQuiz';
import { Action, ActionTypes } from '.';
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

export const fetchQuizzes = () => {
  return async (dispatch: Dispatch) => {
    backend.get('/sanctum/csrf-cookie').then(async (csrf_response) => {
      const response = await backend.get<QuizzesData>('/api/quizzes/');

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

// export const deleteTodo = (id: number): DeleteTodoAction => {
//   return {
//     type: ActionTypes.deleteTodo,
//     payload: id
//   };
// };
