import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  requiredAuth?: boolean;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  requiredAuth,
  alert,
}) => {
  const { data: userLoggedIn } = useCurrentUser();

  const loginModal = useLoginModal();

  const router = useRouter();

  const handleOnClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (requiredAuth && !userLoggedIn) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [onClick, router, href, userLoggedIn, requiredAuth, loginModal]);

  return (
    <div className="flex flex-row items-center" onClick={handleOnClick}>
      {/* Mobile View */}
      <div className="relative rounded-full w-14 h-14 flex items-center justify-center p-4 hover:bg-slate-300/10 cursor-pointer lg:hidden">
        <Icon size={28} color="white" />
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-5 left-0" size={75} />
        ) : null}
      </div>
      {/* Desktop View */}
      <div className="relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300/10 cursor-pointer">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />
        ) : null}
      </div>
    </div>
  );
};

export default SidebarItem;
