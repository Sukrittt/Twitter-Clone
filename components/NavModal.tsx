import React, { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";

import NavigationLinks from "./NavigationLinks";
import NavUserDetails from "./users/NavUserDetails";
import Button from "./Button";
import { signOut } from "next-auth/react";

interface NavModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const NavModal: React.FC<NavModalProps> = ({ isOpen, onClose, title }) => {
  const { data: userLoggedIn } = useCurrentUser();

  const handleOnClose = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute h-screen w-screen bg-neutral-800/70">
      <div className="w-[85vw] bg-black h-full z-50 p-5 fixed  border-r-[1px] border-neutral-700 shadow-xl">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <button
            onClick={handleOnClose}
            className="p-1 ml-auto border-0 text-white hover:opacity-70 transition"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
        <NavUserDetails userLoggedIn={userLoggedIn} />
        <NavigationLinks />
        <div className="mt-8">
          <Button label="Logout" onClick={() => signOut()} secondary />
        </div>
      </div>
    </div>
  );
};

export default NavModal;
