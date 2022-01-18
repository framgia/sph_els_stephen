import { Quiz } from '../AdminQuiz';
import UserQuizzes from './UserQuizzes';

export * from './QuizCard';
export * from './UserQuizzes';

export default UserQuizzes;

export const sortQuizzes = (quizzes: Quiz[] | null) => {
  quizzes?.sort((a, b) => {
    let aVal = a?.is_taken ? 1 : 0;
    let bVal = b?.is_taken ? 1 : 0;
    return aVal - bVal;
  });
};
