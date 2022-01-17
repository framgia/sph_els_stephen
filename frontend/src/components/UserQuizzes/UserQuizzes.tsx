import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';

import { fetchQuizzes, fetchQuizLogs, takeQuiz } from '../../actions';
import { StoreState } from '../../reducers';
import { User } from '../AdminUser';
import { useCookies } from 'react-cookie';
import QuizCard from './QuizCard';
import { Quiz } from '../AdminQuiz';
import {
  Backdrop,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useNavigate } from 'react-router';

interface Props {
  quizzes: Quiz[];
  user: User | null;
  fetchQuizzes: Function;
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
  const [loading, setLoading] = useState(false);
  const [loadingQuiz, setloadingQuiz] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchQuizLogs({
      token: cookies.token,
      callback: () => {
        fetchQuizzes({
          callback: () => {
            setLoading(false);
          },
        });
      },
    });
  }, [cookies, fetchQuizzes, fetchQuizLogs]);

  useEffect(() => {
    const { cancel } = axios.CancelToken.source();
    const timeoutId = setTimeout(() => {
      setLoading(true);
      fetchQuizzes({
        search,
        callback: () => {
          setLoading(false);
        },
      });
    }, 500);

    return () => {
      cancel('Search term changed');
      clearTimeout(timeoutId);
      setLoading(false);
    };
  }, [search, fetchQuizzes]);

  const handleTakeQuiz = (e: any, id: number) => {
    setloadingQuiz(true);
    takeQuiz(id, cookies.token, () => {
      setloadingQuiz(false);
      navigate(`/quizzes/${id}`);
    });
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingQuiz}
      >
        <Stack alignItems="center" spacing={2}>
          <h1 className="text-4xl">{'Submitting Request'}</h1>
          <CircularProgress color="inherit" />
        </Stack>
      </Backdrop>
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

        {loading && <CircularProgress />}

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
    </>
  );
};

const mapStateToProps = ({
  quizzesData,
  userData,
}: StoreState): { quizzes: Quiz[]; user: User | null } => {
  let user = userData.data || null;
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
