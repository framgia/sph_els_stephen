import { useEffect } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../reducers';

import { AdminQuizBody, AdminQuizHeader } from '.';
import { QuizzesData, fetchQuizzes } from '../../actions';
import Table from '../Table';

interface AdminQuizProps {
  quizzesData: QuizzesData;
  fetchQuizzes: Function;
}

export const AdminQuiz = ({
  quizzesData,
  fetchQuizzes,
}: AdminQuizProps): JSX.Element => {
  useEffect(() => {
    fetchQuizzes();
    return () => {};
  }, []);

  return (
    <div className="container mx-auto px-24 py-8">
      <h1>Admin quiz</h1>
      <Table
        headers={<AdminQuizHeader />}
        body={<AdminQuizBody quizzes={quizzesData.data} />}
      />
    </div>
  );
};

const mapStateToProps = ({
  quizzesData,
}: StoreState): { quizzesData: QuizzesData } => {
  return { quizzesData };
};

export default connect(mapStateToProps, { fetchQuizzes })(AdminQuiz);
