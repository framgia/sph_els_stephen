import {
  Action,
  ActionTypes,
  QuizData,
  QuizItemsData,
  QuizzesData,
} from '../actions';

export const quizzesDataReducer = (
  state: QuizzesData = { data: [], links: {}, meta: {} },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.fetchQuizzes:
      return action.payload;
    case ActionTypes.deleteQuiz:
      let quizzes = state.data || [];
      return {
        ...state,
        data: quizzes.filter((quiz) => quiz.id !== action.payload),
      };
    default:
      return state;
  }
};

export const quizDataReducer = (state: QuizData = {}, action: Action) => {
  switch (action.type) {
    case ActionTypes.addQuiz:
      return action.payload;
    case ActionTypes.getQuiz:
      return action.payload;
    case ActionTypes.updateQuiz:
      return action.payload;
    default:
      return state;
  }
};

export const quizResultReducer = (
  state: QuizItemsData = {},
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.fetchQuizResult:
      return action.payload;
    case ActionTypes.clearQuizResult:
      return action.payload;
    default:
      return state;
  }
};
