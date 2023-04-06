import React from "react";
import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";

import useCurrentUser from "@/hooks/useCurrentUser";
import useNavItems from "@/hooks/useNavItems";

import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";

const Sidebar = () => {
  const { data: userLoggedIn } = useCurrentUser();

  const { navItems } = useNavItems();

  return (
    <div className="col-span-1 h-full pr-4 hidden sm:block md:pr-6">
      <div className="flex flex-col items-center md:items-end">
        <div className="space-y-2 lg-w-[230px]">
          <SidebarLogo />
          {navItems.map((item) => (
            <SidebarItem
              key={item.href}
              label={item.label}
              href={
                item.label === "Profile"
                  ? `/users/${userLoggedIn?.id}`
                  : item.href
              }
              icon={item.icon}
              alert={item.alert}
              requiredAuth={item.requiredAuth}
            />
          ))}
          {userLoggedIn && (
            <SidebarItem
              onClick={() => signOut()}
              icon={BiLogOut}
              label="Logout"
            />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
