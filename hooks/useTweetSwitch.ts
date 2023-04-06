import { create } from "zustand";

interface TweetSwitchStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useTweetSwitch = create<TweetSwitchStore>((set) => ({
  isOpen: true, //default value
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useTweetSwitch;
