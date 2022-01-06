import React from 'react';

interface UserAuthFieldProps {
  label: string;
  register?: {};
  type?: string;
  rounded?: string;
  autocomplete?: string;
  errormsg?: string;
}

export const UserAuthField = ({
  label,
  register = {},
  type = 'text',
  rounded = 't-md',
  autocomplete,
  errormsg = '',
}: UserAuthFieldProps) => {
  return (
    <div>
      <label htmlFor={label} className="sr-only">
        {label}
      </label>
      <input
        {...register}
        type={type}
        autoComplete={autocomplete ? autocomplete : label}
        required
        className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-${rounded} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
        placeholder={label}
      />
      <span className="text-red-500 italic">{errormsg}</span>
    </div>
  );
};

export default UserAuthField;
