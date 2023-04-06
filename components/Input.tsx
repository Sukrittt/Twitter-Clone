import React, { useState } from "react";
import { AiFillEye, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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
  const [visible, setVisible] = useState(false);

  const EyeIcon = visible ? AiOutlineEye : AiOutlineEyeInvisible;

  return (
    <>
      <div className="relative">
        <input
          className="w-full text-lg bg-black border-2 border-neutral-800 rounded-md outline-none text-white p-4
        focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
          type={visible ? "text" : type}
          disabled={isDisbaled}
          onChange={onChange}
          value={value ? value : ""}
          placeholder={placeholder}
        ></input>
        {type === "password" && (
          <div
            className="text-neutral-500 absolute right-8 top-[1.35rem]"
            onClick={() => setVisible(!visible)}
          >
            <EyeIcon size={23} />
          </div>
        )}
      </div>
    </>
  );
};

export default Input;
