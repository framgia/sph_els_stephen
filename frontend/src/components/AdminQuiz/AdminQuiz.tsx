import React from 'react';
import Table from '../Table';
import AdminQuizHeader from './AdminQuizHeader';
import AdminQuizBody from './AdminQuizBody';
import { Quiz } from './types';

interface AdminQuizProps {
  records: Quiz[];
}

const AdminQuiz = ({ records }: AdminQuizProps): JSX.Element => {
  return (
    <div>
      <h1>Admin quiz</h1>
      <Table
        headers={<AdminQuizHeader />}
        body={<AdminQuizBody records={records} />}
      />
    </div>
  );
};

export default AdminQuiz;
