import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';

import { fetchQuizzes, fetchQuizLogs, takeQuiz } from '../../actions';
import { StoreState } from '../../reducers';
import { User } from '../AdminUser';
import { useCookies } from 'react-cookie';
import QuizCard from './QuizCard';
import { Quiz } from '../AdminQuiz';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

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
  const [cookies] = useCookies();
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchQuizLogs(cookies.token);
    fetchQuizzes();
  }, [cookies, fetchQuizzes, fetchQuizLogs]);

  useEffect(() => {
    const { cancel } = axios.CancelToken.source();
    const timeoutId = setTimeout(() => {
      fetchQuizzes(search);
    }, 500);

    return () => {
      cancel('Search term changed');
      clearTimeout(timeoutId);
    };
  }, [search, fetchQuizzes]);

  const handleTakeQuiz = (e: any, id: number) => {
    takeQuiz(id, cookies.token, () => {
      fetchQuizLogs(cookies.token);
    });
  };

  return (
    <div className="container mx-auto px-24 py-8">
      <h1 className="font-semibold text-2xl my-4">Quizzes</h1>

      <div className="my-10">
        <TextField
          label="Search Quiz"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>

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
