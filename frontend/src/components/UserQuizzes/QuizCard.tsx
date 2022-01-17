import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Quiz } from '../AdminQuiz';
import { connect } from 'react-redux';

interface Props {
  quiz: Quiz;
  handleTakeQuiz: Function;
}

export const _QuizCard = (props: Props) => {
  return (
    <Card sx={{ minWidth: 500 }}>
      <CardContent>
        <p className="font-semibold text-2xl p-4">{props.quiz.title}</p>
        <p>{props.quiz.description}</p>
      </CardContent>
      <div className="flex justify-end">
        <CardActions>
          <Button
            variant={props.quiz.is_taken ? 'outlined' : 'contained'}
            onClick={(e) => {
              props.handleTakeQuiz(e, props.quiz.id, props.quiz.is_taken);
            }}
          >
            {props.quiz.is_taken ? 'View Result' : 'Start'}
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};

const mapStateToProps = (): {} => {
  return {};
};

export const QuizCard = connect(mapStateToProps, {})(_QuizCard);

export default QuizCard;
