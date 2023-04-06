import React from "react";
import { AiOutlineClose } from "react-icons/ai";

interface PostTweetModalProps {
  onClose: () => void;
  isOpen: boolean;
  body?: React.ReactElement;
}

const PostTweetModal: React.FC<PostTweetModalProps> = ({
  onClose,
  body,
  isOpen,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 outline-none z-50
  focus:outline-none bg-neutral-800/70"
    >
      <div className="relative w-full lg:w-3/6 mx-auto lg:max-w-3xl lg:h-auto h-full overflow-y-hidden">
        <div className="h-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline:none focus:outline-none overflow-y-scroll lg:overflow-y-auto p-2">
          <button
            onClick={onClose}
            className="p-2 border-0 text-white hover:opacity-70 transition"
          >
            <AiOutlineClose size={20} />
          </button>
          {body}
        </div>
      </div>
    </div>
  );
};

export default PostTweetModal;
