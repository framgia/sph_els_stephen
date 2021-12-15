import React from 'react';
import Table from '../Table';
import AdminQuizHeader from './AdminQuizHeader';
import AdminQuizBody from './AdminQuizBody';
import { Quiz } from './types';

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
