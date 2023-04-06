import { create } from "zustand";

interface DeleteModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDeleteModal = create<DeleteModalStore>((set) => ({
  isOpen: false, //default value
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDeleteModal;
