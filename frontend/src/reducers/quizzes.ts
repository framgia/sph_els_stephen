import { Action, ActionTypes, QuizData, QuizzesData } from '../actions';
import { Quiz } from '../components/AdminQuiz';

export const quizzesDataReducer = (
  state: QuizzesData = { data: [], links: {}, meta: {} },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.fetchQuizzes:
      return action.payload;
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
