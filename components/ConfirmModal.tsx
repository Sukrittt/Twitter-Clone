import React, { useCallback } from "react";

import Button from "./Button";

interface ConfirmModalProps {
  title: string;
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  actionLabelOne: string;
  actionLabelTwo: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  actionLabelOne,
  actionLabelTwo,
}) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(() => {
    onSubmit();
  }, [onSubmit]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 outline-none z-50
  focus:outline-none bg-neutral-800/70"
    >
      <div className="relative w-[70%] md:w-[30%] mx-auto max-w-3xl h-auto overflow-y-hidden">
        <div className="h-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline:none focus:outline-none overflow-y-scroll lg:overflow-y-auto p-6">
          <div className="flex flex-col gap-7 justify-center items-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-white">
              {title}
            </h3>
            <div className="flex flex-row justify-center gap-4 md:gap-8 w-full">
              <Button
                label={actionLabelOne}
                onClick={handleClose}
                secondary
                fullWidth
              />
              <Button label={actionLabelTwo} onClick={handleSubmit} fullWidth />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
