import React from 'react';
import { Quiz, AdminQuizAction } from '.';
import { TableBodyRow, TableBodyRowData, TableBody } from '../Table';

interface AdminQuizBodyProps {
  quizzes?: Quiz[];
}

export const AdminQuizBody = ({ quizzes }: AdminQuizBodyProps): JSX.Element => {
  return (
    <>
      {quizzes?.map((quiz) => {
        return (
          <TableBodyRow key={quiz.title}>
            <TableBodyRowData>{quiz.title}</TableBodyRowData>
            <TableBodyRowData>{quiz.description}</TableBodyRowData>
            <AdminQuizAction quiz={quiz} />
          </TableBodyRow>
        );
      })}
    </>
  );
};

export default AdminQuizBody;
