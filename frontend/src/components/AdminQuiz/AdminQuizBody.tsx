import React from 'react';
import { Quiz, AdminQuizAction } from '.';
import { TableBodyRow, TableBodyRowData } from '../Table';

interface AdminQuizBodyProps {
  quizzes?: Quiz[];
  handleQuizDelete: Function;
}

export const AdminQuizBody = ({
  quizzes,
  handleQuizDelete,
}: AdminQuizBodyProps): JSX.Element => {
  return (
    <>
      {quizzes?.map((quiz) => {
        return (
          <TableBodyRow key={quiz.title}>
            <TableBodyRowData>{quiz.title}</TableBodyRowData>
            <TableBodyRowData>{quiz.description}</TableBodyRowData>
            <AdminQuizAction handleQuizDelete={handleQuizDelete} quiz={quiz} />
          </TableBodyRow>
        );
      })}
    </>
  );
};

export default AdminQuizBody;
