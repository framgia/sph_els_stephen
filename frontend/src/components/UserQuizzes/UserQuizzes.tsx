import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Quiz } from '../AdminQuiz';
import QuizCard from './QuizCard';

import { QuizzesData, fetchQuizzes } from '../../actions';
import { StoreState } from '../../reducers';

export const SampleQuizzes: Quiz[] = [
  {
    id: 1,
    title: 'lorem',
    description: 'ipsum',
  },
  {
    id: 2,
    title: 'dolor',
    description: 'est',
  },
  {
    id: 3,
    title: 'kingkong',
    description: 'godzilla',
  },
  {
    id: 3,
    title: 'hot',
    description: 'dog',
  },
];

interface Props {
  quizzesData: QuizzesData;
  fetchQuizzes: Function;
}

const UserQuizzes = ({ quizzesData, fetchQuizzes }: Props) => {
  useEffect(() => {
    fetchQuizzes();
    return () => {};
  }, []);

  return (
    <div className="container mx-auto px-24 py-8">
      <h1 className="font-semibold text-2xl my-4">Quizzes</h1>

      <Grid container spacing={5}>
        <>
          {quizzesData.data?.map((quiz) => {
            return (
              <Grid item>
                <QuizCard quiz={quiz} />
              </Grid>
            );
          })}
        </>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({
  quizzesData,
}: StoreState): { quizzesData: QuizzesData } => {
  return { quizzesData };
};

export default connect(mapStateToProps, { fetchQuizzes })(UserQuizzes);
