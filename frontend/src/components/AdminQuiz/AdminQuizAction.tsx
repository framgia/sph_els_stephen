import React from 'react';
import { Link } from 'react-router-dom';
import { Quiz } from './types';

interface AdminQuizActionProps {
  quiz: Quiz;
}

export const AdminQuizAction = ({
  quiz,
}: AdminQuizActionProps): JSX.Element => {
  return (
    <td>
      <Link
        to={`/admin/quizzes/${quiz.id}/quiz_items/create`}
        className="text-indigo-600 hover:text-indigo-900 px-2 py-4"
      >
        Add Word
      </Link>
      <Link
        to={`/admin/quizzes/${quiz.id}/edit`}
        className="text-indigo-600 hover:text-indigo-900 px-2 py-4"
      >
        Edit
      </Link>
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
