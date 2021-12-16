import React from 'react';
import FormLabel from './FormLabel';

interface FormInputProps {
  id: string;
  name?: string;
  placeholder?: string;
  value?: any;
  onValueChange?: Function;
}

export const FormInput = ({
  id,
  name,
  placeholder,
  value,
  onValueChange = () => {},
}: FormInputProps): JSX.Element => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-3 sm:col-span-2">
        <div className="mt-1 flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
            {placeholder}
          </span>
          <input
            type="text"
            name={name ? name : id}
            id={id}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onValueChange(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default FormInput;
