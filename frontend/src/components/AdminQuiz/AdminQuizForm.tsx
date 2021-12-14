import React from 'react';
import Form, { FormButton, FormInput, FormLabel, FormTextArea } from '../Forms';

interface AdminQuizFormProps {
  title: string;
  children?: React.ReactNode;
}

const AdminQuizForm = ({
  children,
  title,
}: AdminQuizFormProps): JSX.Element => {
  return (
    <div className="container mx-auto px-24 py-8">
      <h1>{title}</h1>

      <Form action="#" method="POST">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <FormLabel text="Title" />
            <FormInput id="title" />

            <FormTextArea
              label="Description"
              placeholder="Description about the quiz"
              description="Write the description of the quiz."
            />
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <FormButton type="submit" text="Save" />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AdminQuizForm;
