import React from 'react';
import { Quiz, AdminQuizHeader, AdminQuizBody } from '.';
import Table from '../Table';

interface AdminQuizProps {
  records: Quiz[];
}

export const AdminQuiz = ({ records }: AdminQuizProps): JSX.Element => {
  return (
    <div className="container mx-auto px-24 py-8">
      <h1>Admin quiz</h1>
      <Table
        headers={<AdminQuizHeader />}
        body={<AdminQuizBody records={records} />}
      />
    </div>
  );
};

export default AdminQuiz;
