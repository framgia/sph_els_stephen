import React from 'react';

interface FormLabelProps {
  text: string;
  children?: React.ReactNode;
}

export const FormLabel = ({ text, children }: FormLabelProps): JSX.Element => {
  return (
    <label
      htmlFor={text.toLowerCase()}
      className="block text-sm font-medium text-gray-700"
    >
      {text}
    </label>
  );
};

export default FormLabel;
