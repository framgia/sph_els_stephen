import React from 'react';
import { Quiz } from './types';

interface AdminQuizActionProps {
  quiz: Quiz;
}

export const AdminQuizAction = ({
  quiz,
}: AdminQuizActionProps): JSX.Element => {
  return (
    <td>
      <a
        href={`quizzes/${quiz.id}/quiz_items/create`}
        className="text-indigo-600 hover:text-indigo-900 px-2 py-4"
      >
        Add Word
      </a>
      <a
        href={`quizzes/${quiz.id}/edit`}
        className="text-indigo-600 hover:text-indigo-900 px-2 py-4"
      >
        Edit
      </a>
      <a
        href={`quizzes/${quiz.id}/delete`}
        className="text-indigo-600 hover:text-indigo-900 px-2 py-4"
      >
        Delete
      </a>
    </td>
  );
};

export default AdminQuizAction;
