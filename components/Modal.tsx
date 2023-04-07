import React, { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";

import Button from "./Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement; //expects a valid React element
  footer?: React.ReactElement; //expects a valid React element
  actionLabel: string;
  disabled?: boolean;
  editModal?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  editModal,
}) => {
  //if button is not disabled then call these function.
  //disabled = true indicates that something in running and it is not yet finished.
  const handleClose = useCallback(() => {
    if (disabled) return;
    onClose();
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 outline-none z-50
                    focus:outline-none bg-neutral-800/70"
      >
        <div
          className={`relative w-full lg:w-3/6 ${
            editModal && "lg:mt-[37vh]"
          } mx-auto lg:max-w-3xl lg:h-auto h-full overflow-y-hidden`}
        >
          {/* Content */}
          <div className="h-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline:none focus:outline-none overflow-y-scroll lg:overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-10 rounded-t">
              <h3 className="text-3xl font-semibold text-white">{title}</h3>
              <button
                onClick={handleClose}
                className="p-1 ml-auto border-0 text-white hover:opacity-70 transition"
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
            {/* BODY  */}
            <div className="relative p-10 flex-auto">{body}</div>
            {/* FOOTER */}
            <div className="flex flex-col gap-2 p-10">
              <Button
                disabled={disabled}
                label={actionLabel}
                secondary
                fullWidth
                large
                onClick={handleSubmit}
              />
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
