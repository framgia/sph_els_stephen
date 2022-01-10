import { combineReducers } from 'redux';
import { QuizData, QuizzesData, UserData, UsersData } from '../actions';
import { QuizItemData } from '../actions/quizItems';
import { quizItemReducer } from './quizItems';
import { quizDataReducer, quizzesDataReducer } from './quizzes';
import { userDataReducer, usersDataReducer } from './users';

export interface StoreState {
  quizzesData: QuizzesData;
  quizData: QuizData;
  userData: UserData;
  usersData: UsersData;
  quizItemData: QuizItemData;
}

export const reducers = combineReducers<StoreState>({
  quizzesData: quizzesDataReducer,
  quizData: quizDataReducer,
  userData: userDataReducer,
  usersData: usersDataReducer,
  quizItemData: quizItemReducer,
});
