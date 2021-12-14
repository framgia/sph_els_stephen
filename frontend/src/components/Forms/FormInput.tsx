import React from 'react';
import FormLabel from './FormLabel';

interface FormInputProps {
  id: string;
<<<<<<< Updated upstream
=======
  name?: string;
>>>>>>> Stashed changes
  placeholder?: string;
  value?: any;
}

{
  /* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
  <span className="text-gray-500 sm:text-sm">$</span>
</div> */
}

export const FormInput = ({
  id,
  name,
  placeholder,
  value,
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
          />
        </div>
      </div>
    </div>
  );
};

export default FormInput;
