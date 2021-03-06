import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../reducers';

import { addQuizItem, QuizItem, QuizItemData } from '../../actions/quizItems';
import Form, { FormLabel, FormInput, FormButton } from '../Forms';
import { useNavigate, useParams } from 'react-router';
import { CircularProgress } from '@mui/material';

interface AdminQuizItemFormProps {
  quizItemData: QuizItemData;
  addQuizItem: Function;
}

const AdminQuizItemForm = ({
  quizItemData,
  addQuizItem,
}: AdminQuizItemFormProps): JSX.Element => {
  let { quiz_id } = useParams();
  const [_question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function onQuestionChange(e: any) {
    setQuestion(e.target.value);
  }

  function onSubmit(e: any) {
    e.preventDefault();

    let parsed = parseInt(quiz_id || '');
    let quizItem: QuizItem = { quiz_id: parsed, question: _question };
    setIsLoading(true);
    addQuizItem({
      quizItem,
      callback: () => {
        setIsLoading(false);
        navigate('/admin/quizzes');
      },
    });
  }

  return (
    <div className="container mx-auto px-24 py-8">
      <h1>Add quiz item data</h1>

      <Form action="#" method="POST">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="grid grid-cols-2 px-4 py-5">
            <div className="">
              <FormLabel text="Question" />
              <FormInput
                id="question"
                value={_question}
                onValueChange={onQuestionChange}
              />
            </div>

            <div className="">
              <FormLabel text="Choices" />
              <FormInput id="choice1" name="choices[]" />
              <FormInput id="choice2" name="choices[]" />
              <FormInput id="choice3" name="choices[]" />
              <FormInput id="choice4" name="choices[]" />
              <p className="italic">
                note: the first choice is the correct choice
              </p>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            {isLoading ? (
              <CircularProgress />
            ) : (
              <FormButton type="submit" text="Save" onSubmit={onSubmit} />
            )}
          </div>
        </div>
      </Form>
    </div>
  );
};

const mapStateToProps = ({
  quizItemData,
}: StoreState): { quizItemData: QuizItemData } => {
  return { quizItemData };
};

export default connect(mapStateToProps, { addQuizItem })(AdminQuizItemForm);
