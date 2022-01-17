import { QuizItem } from '../../actions';

export const getAnswer = (quiz_item: QuizItem | null) => {
  let answer = quiz_item?.choices?.find(
    (choice) => choice.id === quiz_item.answer
  );
  return answer?.choice;
};

export const getCorrectAnswer = (quiz_item: QuizItem | null) => {
  let correctAnswer = quiz_item?.choices?.find(
    (choice) => choice.id === quiz_item.correct
  );
  return correctAnswer?.choice;
};

export const isCorrectAnswer = (quiz_item: QuizItem | null) => {
  return quiz_item?.answer === quiz_item?.correct;
};

export const getScore = (quiz_items: QuizItem[] | null) => {
  let corrects = quiz_items?.filter((quiz_item) => isCorrectAnswer(quiz_item));
  return corrects?.length;
};
