import { create } from "zustand";

interface NavSwitchStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useNavSwitch = create<NavSwitchStore>((set) => ({
  isOpen: true, //default value
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useNavSwitch;
