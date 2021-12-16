import React from 'react';

interface UserAuthFieldProps {
  label: string;
  name: string;
  type?: string;
  rounded?: string;
  autocomplete?: string;
}

export const UserAuthField = ({
  label,
  name,
  type = 'text',
  rounded = 't-md',
  autocomplete,
}: UserAuthFieldProps) => {
  return (
    <div>
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autocomplete ? autocomplete : name}
        required
        className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-${rounded} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
        placeholder={label}
      />
    </div>
  );
};

export default UserAuthField;
