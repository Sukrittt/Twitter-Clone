import React from "react";

import useDeleteModal from "@/hooks/useDeleteModal";
import useDeleteHandler from "@/hooks/useDeleteHandler";

import ConfirmModal from "../ConfirmModal";

interface DeleteModalProps {
  commentId: string;
  type: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ commentId, type }) => {
  const deleteModal = useDeleteModal();
  const { handleDelete } = useDeleteHandler(type, commentId);

  return (
    <ConfirmModal
      title="Delete Tweet?"
      actionLabelOne="Cancel"
      actionLabelTwo="Delete"
      isOpen={deleteModal.isOpen}
      onClose={deleteModal.onClose}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteModal;
