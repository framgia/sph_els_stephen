import React, { useEffect, useState } from 'react';
import Form, { FormButton, FormInput, FormLabel, FormTextArea } from '../Forms';
import { connect } from 'react-redux';
import { QuizData, getQuiz, updateQuiz } from '../../actions';
import { StoreState } from '../../reducers';
import { useNavigate, useParams } from 'react-router';
import { CircularProgress } from '@mui/material';

interface AdminQuizEditFormProps {
  children?: React.ReactNode;
  quizData: QuizData;
  getQuiz: Function;
  updateQuiz: Function;
}

export const _AdminQuizEditForm = ({
  children,
  quizData,
  getQuiz,
  updateQuiz,
}: AdminQuizEditFormProps): JSX.Element => {
  let { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const [_title, setTitle] = useState('');
  const [_description, setDescription] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    getQuiz(id);
  }, [getQuiz, id]);

  useEffect(() => {
    setTitle(quizData?.data?.title || '');
    setDescription(quizData?.data?.description || '');
  }, [quizData]);

  function onTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function onDescriptionChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(event.target.value);
  }

  function onSubmit(event: React.FormEvent<SubmitEvent>) {
    event.preventDefault();

    setIsLoading(true);
    updateQuiz({
      quizId: id,
      quiz: { title: _title, description: _description },
      callback: () => {
        setIsLoading(false);
        navigate('/admin/quizzes');
      },
    });
  }

  return (
    <div className="container mx-auto px-24 py-8">
      <h1>Edit Quiz</h1>

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

const mapStateToProps = ({ quizData }: StoreState): { quizData: QuizData } => {
  return { quizData };
};

export const AdminQuizEditForm = connect(mapStateToProps, {
  getQuiz,
  updateQuiz,
})(_AdminQuizEditForm);
export default AdminQuizEditForm;
