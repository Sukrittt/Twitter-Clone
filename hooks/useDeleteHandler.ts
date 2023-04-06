import axios from "axios";
import { toast } from "react-hot-toast";

import useDeleteModal from "./useDeleteModal";

const useDeleteHandler = (type: string, id: string) => {
  const deleteModal = useDeleteModal();

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/delete/${type}`, { data: { id } });
      toast.success("Success");
      deleteModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return { handleDelete };
};

export default useDeleteHandler;
