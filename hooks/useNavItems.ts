import { BsBell, BsHouse } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";

import useCurrentUser from "@/hooks/useCurrentUser";

const useNavItems = () => {
  const { data: userLoggedIn } = useCurrentUser();

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: BsHouse,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBell,
      alert: userLoggedIn?.hasNotifications,
      requiredAuth: true, //authentication required
    },
    {
      label: "Profile",
      href: "/users/123",
      icon: FaRegUser,
      requiredAuth: true, //authentication required
    },
  ];

  return { navItems };
};

export default useNavItems;
