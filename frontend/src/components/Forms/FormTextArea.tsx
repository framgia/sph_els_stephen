import React from 'react';

interface FormTextAreaProps {
  label: string;
  placeholder: string;
  description: string;
}

export const FormTextArea = ({
  label,
  placeholder,
  description,
}: FormTextAreaProps): JSX.Element => {
  return (
    <div>
      <label
        htmlFor={label.toLowerCase()}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <textarea
          id={label.toLowerCase()}
          name={label.toLowerCase()}
          rows={3}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          placeholder={placeholder}
          defaultValue={''}
        />
      </div>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default FormTextArea;
