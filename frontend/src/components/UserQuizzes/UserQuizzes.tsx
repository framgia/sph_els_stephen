import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';

import {
  QuizzesData,
  fetchQuizzes,
  fetchQuizLogs,
  takeQuiz,
} from '../../actions';
import { StoreState } from '../../reducers';
import { User } from '../AdminUser';
import { useCookies } from 'react-cookie';
import QuizCard from './QuizCard';
import { Quiz } from '../AdminQuiz';

interface Props {
  quizzes: Quiz[];
  fetchQuizzes: Function;
  user?: User;
  takeQuiz: Function;
  fetchQuizLogs: Function;
}

export const _UserQuizzes = ({
  quizzes,
  fetchQuizzes,
  user,
  takeQuiz,
  fetchQuizLogs,
}: Props) => {
  const [cookies, setCookies] = useCookies();

  useEffect(() => {
    fetchQuizzes();
    fetchQuizLogs(cookies.token);
    return () => {};
  }, []);

  const handleTakeQuiz = (e: any, id: number) => {
    takeQuiz(id, cookies.token, () => {
      fetchQuizLogs(cookies.token);
    });
  };

  return (
    <div className="container mx-auto px-24 py-8">
      <h1 className="font-semibold text-2xl my-4">Quizzes</h1>

      <Grid container spacing={5}>
        {quizzes?.map((quiz) => {
          return (
            <Grid key={quiz.id} item>
              <QuizCard quiz={quiz} handleTakeQuiz={handleTakeQuiz} />
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
}: StoreState): { quizzes: Quiz[]; user?: User } => {
  let user = userData.data;
  let quizzes = quizzesData.data || [];

  let quiz_logs = user?.quiz_logs || [];
  let quiz_logs_ids: number[] = quiz_logs?.map(
    (quiz_log) => quiz_log['quiz_id']
  );

  quizzes = quizzes.map((quiz) => {
    return { ...quiz, is_taken: quiz_logs_ids.includes(quiz['id'] || 0) };
  });

  return { quizzes, user };
};

export const UserQuizzes = connect(mapStateToProps, {
  fetchQuizzes,
  takeQuiz,
  fetchQuizLogs,
})(_UserQuizzes);

export default UserQuizzes;
