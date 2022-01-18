import { useEffect } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../reducers';

import { AdminQuizBody, AdminQuizHeader } from '.';
import { QuizzesData, fetchQuizzes, deleteQuiz } from '../../actions';
import Table from '../Table';

interface AdminQuizProps {
  quizzesData: QuizzesData;
  fetchQuizzes: Function;
  deleteQuiz: Function;
}

export const AdminQuiz = ({
  quizzesData,
  fetchQuizzes,
  deleteQuiz,
}: AdminQuizProps): JSX.Element => {
  useEffect(() => {
    fetchQuizzes({ search: '' });
  }, [fetchQuizzes]);

  const handleQuizDelete = (e: any, id: number) => {
    deleteQuiz({
      quizId: id,
      callback: () => {
        fetchQuizzes({ search: '' });
      },
    });
  };

  return (
    <div className="container mx-auto px-24 py-8">
      <h1>Admin quiz</h1>
      <Table
        headers={<AdminQuizHeader />}
        body={
          <AdminQuizBody
            handleQuizDelete={handleQuizDelete}
            quizzes={quizzesData.data}
          />
        }
      />
    </div>
  );
};

const mapStateToProps = ({
  quizzesData,
}: StoreState): { quizzesData: QuizzesData } => {
  return { quizzesData };
};

export default connect(mapStateToProps, { fetchQuizzes, deleteQuiz })(
  AdminQuiz
);
