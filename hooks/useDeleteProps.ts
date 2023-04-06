import { create } from "zustand";

interface DeletePropsStore {
  id: string;
  type: string;
  setId: (id: string) => void;
  setType: (type: string) => void;
}

const useDeleteProps = create<DeletePropsStore>((set) => ({
  id: "",
  type: "",
  setId: (id: string) => set({ id }),
  setType: (type: string) => set({ type }),
}));

export default useDeleteProps;
