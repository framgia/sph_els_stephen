import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { shuffleChoices } from '.';
import {
  QuizAnswersData,
  QuizItem,
  fetchQuizItems,
  selectChoice,
  submitQuiz,
} from '../../actions';
import { StoreState } from '../../reducers';

import {
  Backdrop,
  Button,
  CircularProgress,
  Skeleton,
  Stack,
} from '@mui/material';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';

interface Props {
  quizItems: QuizItem[] | null;
  quizAnswers: QuizAnswersData | null;
  fetchQuizItems: Function;
  selectChoice: Function;
}

export const _UserQuizAnswer = ({
  quizItems,
  quizAnswers,
  fetchQuizItems,
  selectChoice,
}: Props) => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [loadingMessage, setloadingMessage] = useState('Loading Quiz');

  const [currentQuizItem, setcurrentQuizItem] = useState<QuizItem | null>(null);
  const [currentItemId, setCurrentItemId] = useState(0);

  const [quizTitle, setquizTitle] = useState('Quiz Title');

  const [cookies] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchQuizItems({
      token: cookies.token,
      quiz_id: id,
      callback: () => {
        setLoading(false);
        setCurrentItemId(1);
      },
    });
  }, [cookies, fetchQuizItems, id]);

  useEffect(() => {
    setcurrentQuizItem(quizItems?.at(currentItemId - 1) || null);
  }, [currentItemId, quizItems]);

  useEffect(() => {
    setquizTitle(currentQuizItem?.quiz_title || 'Quiz Title');
  }, [currentQuizItem]);

  useEffect(() => {
    const currentQuiz = quizAnswers?.quizzes?.find(
      (quiz) => quiz.quiz_id === id
    );
    if (currentQuiz) {
      if (currentQuiz.choices_id?.length === quizItems?.length) {
        setLoading(true);
        setloadingMessage('Submitting Quiz');

        submitQuiz({
          quiz_id: id,
          choices_id: currentQuiz.choices_id || [],
          token: cookies.token,
          callback: () => {
            setLoading(false);
            navigate('result');
          },
        });
      }
    }
  }, [quizAnswers, cookies, id, navigate, quizItems]);

  const handleChoiceClick = (e: any, choice_id: number) => {
    selectChoice({ quiz_id: id, choice_id: choice_id });
    currentItemId !== quizItems?.length && setCurrentItemId(currentItemId + 1);
  };

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <Stack alignItems="center" spacing={2}>
          <h1 className="text-4xl">{loadingMessage}</h1>
          <CircularProgress color="inherit" />
        </Stack>
      </Backdrop>

      <div className="container mx-auto pt-10 px-4">
        <Stack direction="row" justifyContent="space-evenly">
          <Stack>
            <h1 className="text-4xl font-light mb-20">{quizTitle}</h1>

            {loading ? (
              <Skeleton variant="text" width={200} height={100} />
            ) : (
              <h1 className="text-4xl font-medium mb-20">
                {currentQuizItem?.question}
              </h1>
            )}
          </Stack>
          <Stack>
            <h1 className="text-4xl font-light mb-20">
              {currentItemId} of {quizItems?.length || 0}
            </h1>

            <Stack className="" direction="column" spacing={2}>
              {loading
                ? Array.from(Array(4).keys()).map((tempKey) => {
                    return (
                      <Skeleton
                        key={tempKey}
                        variant="rectangular"
                        width={210}
                        height={60}
                      />
                    );
                  })
                : shuffleChoices(currentQuizItem?.choices || null)?.map(
                    (choice) => {
                      return (
                        <Button
                          key={choice.id}
                          variant="contained"
                          size="large"
                          onClick={(e) => handleChoiceClick(e, choice.id || 0)}
                        >
                          {choice.choice || 'Choice'}
                        </Button>
                      );
                    }
                  )}
            </Stack>
          </Stack>
        </Stack>
      </div>
    </>
  );
};

const mapStateToProps = ({
  quizItemsData,
  quizAnswers,
}: StoreState): {
  quizItems: QuizItem[] | null;
  quizAnswers: QuizAnswersData | null;
} => {
  let quizItems = quizItemsData.data || null;

  return { quizItems, quizAnswers };
};

export const UserQuizAnswer = connect(mapStateToProps, {
  fetchQuizItems,
  selectChoice,
})(_UserQuizAnswer);

export default UserQuizAnswer;
