import React from "react";

interface InputProps {
  placeholder?: string;
  value: string;
  type?: string;
  isDisbaled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  type,
  isDisbaled,
  onChange,
}) => {
  return (
    <input
      className="w-full text-lg bg-black border-2 border-neutral-800 rounded-md outline-none text-white p-4
                focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
      type={type}
      disabled={isDisbaled}
      onChange={onChange}
      value={value ? value : ""}
      placeholder={placeholder}
    ></input>
  );
};

export default Input;
