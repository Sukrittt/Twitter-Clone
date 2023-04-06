import React from "react";

interface ToggleSectionProps {
  labelOne: string;
  labelTwo: string;

  visitLinkOne?: () => void;
  visitLinkTwo?: () => void;

  isActive?: boolean;
}

const ToggleSection: React.FC<ToggleSectionProps> = ({
  labelOne,
  labelTwo,
  visitLinkOne,
  visitLinkTwo,
  isActive,
}) => {
  return (
    <div className="flex flex-row h-[8vh]">
      <div
        onClick={visitLinkOne}
        className={`${
          isActive ? "text-white" : "text-neutral-500"
        } text-md font-semibold hover:bg-neutral-800/80 transition
      cursor-pointer w-3/6 flex justify-center items-center`}
      >
        <span
          className={`${
            isActive && "border-b-[3px] border-sky-500 rounded-sm"
          }`}
        >
          {labelOne}
        </span>
      </div>
      <div
        onClick={visitLinkTwo}
        className={`${
          !isActive ? "text-white" : "text-neutral-500"
        } text-md font-semibold hover:bg-neutral-800/80 transition cursor-pointer w-3/6
      flex justify-center items-center`}
      >
        <span
          className={`${
            !isActive && "border-b-[3px] border-sky-500 rounded-sm"
          }`}
        >
          {labelTwo}
        </span>
      </div>
    </div>
  );
};

export default ToggleSection;
