import { combineReducers } from 'redux';
import { QuizData, QuizzesData } from '../actions';
import { Quiz } from '../components/AdminQuiz';
import { quizDataReducer, quizzesDataReducer } from './quizzes';

export interface StoreState {
  quizzesData: QuizzesData;
  quizData: QuizData;
}

export const reducers = combineReducers<StoreState>({
  quizzesData: quizzesDataReducer,
  quizData: quizDataReducer,
});
