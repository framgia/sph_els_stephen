import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Quiz } from '../AdminQuiz';

interface Props {
  quiz: Quiz;
}

const QuizCard = (props: Props) => {
  return (
    <>
      <Card sx={{ minWidth: 500 }}>
        <CardContent>
          <p className="font-semibold text-2xl p-4">{props.quiz.title}</p>
          <p>{props.quiz.description}</p>
        </CardContent>
        <div className="flex justify-end">
          <CardActions>
            <Button variant="contained">Start</Button>
          </CardActions>
        </div>
      </Card>
    </>
  );
};

export default QuizCard;
