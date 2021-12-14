import React from 'react';
import FormButton from './FormButton';
import FormTextArea from './FormTextArea';
import FormInput from './FormInput';
import FormLabel from './FormLabel';

interface FormProps {
  action: string;
  method: string;
  children?: React.ReactNode;
}

const Form = ({ action, method, children }: FormProps): JSX.Element => {
  return (
    <form action={action} method={method}>
      {children}
    </form>
  );
};

export default Form;
