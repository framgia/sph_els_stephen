import { Action, ActionTypes, TakeQuizAction } from '../actions';
import {
  QuizAnswersData,
  QuizItemData,
  QuizItemsData,
  SelectChoiceAction,
  SelectedChoicesData,
} from '../actions/quizItems';

const selectChoiceFunc = (
  state: QuizAnswersData = {},
  action: SelectChoiceAction
) => {
  let payload_quiz_id = action.payload.quiz_id;
  let payload_choices_id = action.payload.choices_id;

  let foundChoices: SelectedChoicesData | null =
    state.quizzes?.find((quiz) => quiz.quiz_id === payload_quiz_id) || null;

  if (!foundChoices) {
    return {
      ...state,
      quizzes: [{ quiz_id: payload_quiz_id, choices_id: payload_choices_id }],
    };
  }

  let updatedChoices = {
    ...foundChoices,
    choices_id: [
      ...(foundChoices.choices_id || []),
      ...(payload_choices_id || []),
    ],
  };

  let newQuizzes = state.quizzes?.map((quiz) => {
    if (quiz.quiz_id === foundChoices?.quiz_id) return updatedChoices;
    return quiz;
  });

  return {
    ...state,
    quizzes: newQuizzes,
  };
};

const takeQuizFunc = (state: QuizAnswersData = {}, action: TakeQuizAction) => {
  let taken_quiz_id = action.payload;
  let updatedQuizzes = state.quizzes?.filter((quiz) => {
    return quiz.quiz_id !== taken_quiz_id;
  });
  return {
    ...state,
    quizzes: updatedQuizzes,
  };
};

export const quizItemReducer = (state: QuizItemData = {}, action: Action) => {
  switch (action.type) {
    case ActionTypes.addQuizItem:
      return action.payload;
    default:
      return state;
  }
};

export const quizItemsReducer = (state: QuizItemsData = {}, action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchQuizItems:
      return action.payload;
    default:
      return state;
  }
};

export const quizAnswersReducer = (
  state: QuizAnswersData = {},
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.selectChoice:
      return selectChoiceFunc(state, action);
    case ActionTypes.takeQuiz:
      return takeQuizFunc(state, action);
    default:
      return state;
  }
};
