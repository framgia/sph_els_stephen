import React, { useState } from 'react';
import Form, { FormButton, FormInput, FormLabel, FormTextArea } from '../Forms';
import { connect } from 'react-redux';

import { StoreState } from '../../reducers';
import { QuizData, addQuiz } from '../../actions';
import { Quiz } from '.';

interface AdminQuizFormProps {
  children?: React.ReactNode;
  quizData: QuizData;
  addQuiz: Function;
}

// eslint-disable-next-line -- will implement this later
type FormValues = {
  title: string;
  description: string;
};

// eslint-disable-next-line -- will implement this later
const FormValidation = {
  title: {
    required: {
      value: true,
      message: 'Title field is required.',
    },
    max: {
      value: 255,
      message: 'Title field max character up to 255 only.',
    },
  },
  description: {
    required: {
      value: true,
      message: 'Description field is required.',
    },
    max: {
      value: 255,
      message: 'Description field max character up to 255 only.',
    },
  },
};

export const _AdminQuizForm = ({
  children,
  quizData,
  addQuiz,
}: AdminQuizFormProps): JSX.Element => {
  const [_title, setTitle] = useState('');
  const [_description, setDescription] = useState('');

  function onTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function onDescriptionChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(event.target.value);
  }

  function onSubmit(event: React.FormEvent<SubmitEvent>) {
    event.preventDefault();

    let _quiz: Quiz = {
      title: _title,
      description: _description,
    };

    addQuiz(_quiz);
    setTitle('');
    setDescription('');
  }

  return (
    <div className="container mx-auto px-24 py-8">
      <h1>Create Quiz Form</h1>

      <Form action="#" method="POST">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <FormLabel text="Title" />
            <FormInput
              id="title"
              value={_title}
              onValueChange={onTitleChange}
            />

            <FormTextArea
              label="Description"
              placeholder="Description about the quiz"
              description="Write the description of the quiz."
              value={_description}
              onValueChange={onDescriptionChange}
            />
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <FormButton type="submit" text="Save" onSubmit={onSubmit} />
          </div>
        </div>
      </Form>
    </div>
  );
};

const mapStateToProps = ({ quizData }: StoreState): { quizData: QuizData } => {
  return { quizData };
};

export const AdminQuizForm = connect(mapStateToProps, { addQuiz })(
  _AdminQuizForm
);

export default AdminQuizForm;
