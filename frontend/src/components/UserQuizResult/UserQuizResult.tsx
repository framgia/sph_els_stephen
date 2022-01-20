import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { StoreState } from '../../reducers';
import { QuizItem, fetchQuizResults, clearQuizResult } from '../../actions';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { getAnswer, getCorrectAnswer, getScore, isCorrectAnswer } from '.';

import { Button, Skeleton, Stack } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { pink } from '@mui/material/colors';

interface Props {
  quizItemsResult: QuizItem[] | null;
  fetchQuizResults: Function;
}

export const _UserQuizResult = ({
  quizItemsResult,
  fetchQuizResults,
}: Props) => {
  let { id } = useParams();

  const navigate = useNavigate();

  const [quizTitle, setquizTitle] = useState('Quiz Title');
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [cookies] = useCookies();

  useEffect(() => {
    setLoading(true);
    fetchQuizResults({
      token: cookies.token,
      quiz_id: id,
      callback: () => {
        setLoading(false);
      },
    });

    return () => {
      clearQuizResult();
    };
  }, [cookies, id, fetchQuizResults]);

  useEffect(() => {
    let sample_quiz_title = quizItemsResult?.at(0)?.quiz_title;
    setquizTitle(sample_quiz_title || 'Quiz Title');
    setScore(getScore(quizItemsResult) || 0);
    setTotal(quizItemsResult?.length || 0);
  }, [quizItemsResult]);

  return (
    <div className="container mx-auto pt-10 px-4">
      <Stack direction="row" justifyContent="space-evenly">
        <h1 className="text-4xl font-bold">{quizTitle}</h1>

        <Stack direction="row">
          <h1 className="text-4xl font-bold mr-2">Result :</h1>
          <h1 className="text-4xl">{`${score} of ${total}`}</h1>
        </Stack>
      </Stack>

      <Stack className="mt-12" direction="row" justifyContent="space-evenly">
        <Stack direction="row">
          <CheckIcon fontSize="large" color="success" />
          <h1 className="text-2xl font-bold mx-2">or</h1>
          <ClearIcon fontSize="large" sx={{ color: pink[500] }} />
        </Stack>
        <h1 className="text-2xl font-bold mr-2">Question</h1>
        <h1 className="text-2xl font-bold mr-2">Answer</h1>
      </Stack>

      <Stack direction="column" spacing={2} className="mt-4">
        {loading
          ? Array.from(Array(10).keys()).map((tempKey) => {
              return (
                <Stack
                  key={tempKey}
                  direction="row"
                  justifyContent="space-evenly"
                >
                  <Skeleton variant="circular" width={50} height={50} />
                  <Skeleton variant="text" width={210} height={50} />
                  <Skeleton variant="rectangular" width={210} height={50} />
                </Stack>
              );
            })
          : quizItemsResult?.map((result) => {
              return (
                <Stack
                  key={result.id}
                  direction="row"
                  justifyContent="space-evenly"
                >
                  {isCorrectAnswer(result) ? (
                    <CheckIcon fontSize="large" color="success" />
                  ) : (
                    <ClearIcon fontSize="large" sx={{ color: pink[500] }} />
                  )}
                  <h1>{getAnswer(result)}</h1>
                  <h1>{getCorrectAnswer(result)}</h1>
                </Stack>
              );
            })}
      </Stack>

      <Stack
        className="mt-10"
        justifyContent={'space-around'}
        direction={'row'}
      >
        <Button
          className=""
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={(e) => navigate('/quizzes')}
        >
          Back to Quizzes
        </Button>
        <Button
          className=""
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={(e) => navigate('/dashboard')}
        >
          Go to Dashboard
        </Button>
      </Stack>
    </div>
  );
};

const mapStateToProps = ({
  quizResult,
}: StoreState): { quizItemsResult: QuizItem[] | null } => {
  let quizItemsResult = quizResult.data || null;
  return { quizItemsResult };
};

export const UserQuizResult = connect(mapStateToProps, { fetchQuizResults })(
  _UserQuizResult
);

export default UserQuizResult;
