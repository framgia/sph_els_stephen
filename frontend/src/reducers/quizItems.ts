import { Action, ActionTypes } from '../actions';
import { QuizItemData } from '../actions/quizItems';

export const quizItemReducer = (state: QuizItemData = {}, action: Action) => {
  switch (action.type) {
    case ActionTypes.addQuizItem:
      return action.payload;
    default:
      return state;
  }
};
