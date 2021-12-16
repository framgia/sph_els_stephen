import React from 'react';

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
