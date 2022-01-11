import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';

import { QuizzesData, fetchQuizzes, fetchQuizLogs } from '../../actions';
import { StoreState } from '../../reducers';
import { User } from '../AdminUser';
import { useCookies } from 'react-cookie';
import QuizCard from './QuizCard';

interface Props {
  quizzesData: QuizzesData;
  fetchQuizzes: Function;
  user?: User;
  fetchQuizLogs: Function;
}

export const _UserQuizzes = ({
  quizzesData,
  fetchQuizzes,
  user,
  fetchQuizLogs,
}: Props) => {
  const [cookies, setCookies] = useCookies();

  useEffect(() => {
    fetchQuizzes();
    fetchQuizLogs(cookies.token);
    return () => {};
  }, []);

  return (
    <div className="container mx-auto px-24 py-8">
      <h1 className="font-semibold text-2xl my-4">Quizzes</h1>

      <Grid container spacing={5}>
        {quizzesData.data?.map((quiz) => {
          return (
            <Grid key={quiz.id} item>
              <QuizCard quiz={quiz} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

const mapStateToProps = ({
  quizzesData,
  userData,
}: StoreState): { quizzesData: QuizzesData; user?: User } => {
  let user = userData.data;
  console.log(user);
  return { quizzesData, user };
};

const UserQuizzes = connect(mapStateToProps, { fetchQuizzes, fetchQuizLogs })(
  _UserQuizzes
);

export default UserQuizzes;
