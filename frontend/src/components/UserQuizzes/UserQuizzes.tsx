import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Quiz } from '../AdminQuiz';
import QuizCard from './QuizCard';

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

interface Props {}

const UserQuizzes = (props: Props) => {
  return (
    <div className="container mx-auto px-24 py-8">
      <h1 className="font-semibold text-2xl my-4">Quizzes</h1>

      <Grid container spacing={5}>
        <Grid item>
          <QuizCard quiz={SampleQuizzes[0]} />
        </Grid>
        <Grid item>
          <QuizCard quiz={SampleQuizzes[1]} />
        </Grid>
        <Grid item>
          <QuizCard quiz={SampleQuizzes[2]} />
        </Grid>
        <Grid item>
          <QuizCard quiz={SampleQuizzes[3]} />
        </Grid>
      </Grid>
    </div>
  );
};

export default UserQuizzes;
