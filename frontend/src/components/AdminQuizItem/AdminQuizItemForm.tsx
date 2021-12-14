import { title } from 'process';
import React from 'react';
import Form, { FormLabel, FormInput, FormTextArea, FormButton } from '../Forms';

interface AdminQuizItemFormProps {
  title: string;
}

const AdminQuizItemForm = ({ title }: AdminQuizItemFormProps): JSX.Element => {
  return (
    <div className="container mx-auto px-24 py-8">
      <h1>{title}</h1>

      <Form action="#" method="POST">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="grid grid-cols-2 px-4 py-5">
            <div className="">
              <FormLabel text="Question" />
              <FormInput id="question" />
            </div>

            <div className="">
              <FormLabel text="Choices" />
              <FormInput id="choice1" name="choices[]" />
              <FormInput id="choice2" name="choices[]" />
              <FormInput id="choice3" name="choices[]" />
              <FormInput id="choice4" name="choices[]" />
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <FormButton type="submit" text="Save" />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AdminQuizItemForm;
