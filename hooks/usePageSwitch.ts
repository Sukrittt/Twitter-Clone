import { create } from "zustand";

interface PageSwitchStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePageSwitch = create<PageSwitchStore>((set) => ({
  isOpen: true, //default value
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePageSwitch;
