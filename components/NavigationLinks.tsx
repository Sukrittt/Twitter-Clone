import React from "react";
import { useRouter } from "next/router";

import useNavigationModal from "@/hooks/useNavigationModal";
import useNavItems from "@/hooks/useNavItems";

const NavigationLinks = () => {
  const router = useRouter();
  const { navItems } = useNavItems();

  const navigationModal = useNavigationModal();

  const handleRedirectPage = (item: Record<string, any>) => {
    navigationModal.onClose();
    router.push(item.href);
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {navItems.map((item) => (
        <div
          className="flex gap-5 mt-4 items-center"
          key={item.href}
          onClick={() => handleRedirectPage(item)}
        >
          <div>
            <item.icon size={22} color="white" />
          </div>
          <p className="text-white text-xl font-semibold">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default NavigationLinks;
