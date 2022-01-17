import { combineReducers } from 'redux';
import { QuizData, QuizzesData, UserData, UsersData } from '../actions';
import {
  QuizAnswersData,
  QuizItemData,
  QuizItemsData,
} from '../actions/quizItems';
import {
  quizAnswersReducer,
  quizItemReducer,
  quizItemsReducer,
} from './quizItems';
import {
  quizDataReducer,
  quizzesDataReducer,
  quizResultReducer,
} from './quizzes';
import { userDataReducer, usersDataReducer } from './users';

export interface StoreState {
  quizzesData: QuizzesData;
  quizData: QuizData;
  userData: UserData;
  usersData: UsersData;
  quizItemData: QuizItemData;
  quizItemsData: QuizItemsData;
  quizAnswers: QuizAnswersData;
  quizResult: QuizItemsData;
}

export const reducers = combineReducers<StoreState>({
  quizzesData: quizzesDataReducer,
  quizData: quizDataReducer,
  userData: userDataReducer,
  usersData: usersDataReducer,
  quizItemData: quizItemReducer,
  quizItemsData: quizItemsReducer,
  quizAnswers: quizAnswersReducer,
  quizResult: quizResultReducer,
});
