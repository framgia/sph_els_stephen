import { combineReducers } from 'redux';
import { QuizData, QuizzesData, UsersData } from '../actions';
import { quizDataReducer, quizzesDataReducer } from './quizzes';
import { usersDataReducer } from './users';

export interface StoreState {
  quizzesData: QuizzesData;
  quizData: QuizData;
  usersData: UsersData;
}

export const reducers = combineReducers<StoreState>({
  quizzesData: quizzesDataReducer,
  quizData: quizDataReducer,
  usersData: usersDataReducer,
});
