import React, { useCallback, useState } from "react";
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
          className="w-full text-lg bg-black border-2 border-neutral-800 rounded-md outline-none text-white pt-8 pb-5 px-4
        focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed peer"
          type={visible ? "text" : type}
          disabled={isDisbaled}
          onChange={onChange}
          value={value ? value : ""}
        ></input>
        <span className="text-neutral-500 absolute left-4 top-[10px] text-sm peer-focus:text-sky-500">
          {placeholder}
        </span>
        {type === "password" && (
          <div
            className="text-neutral-500 absolute right-8 top-[1.85rem]"
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
