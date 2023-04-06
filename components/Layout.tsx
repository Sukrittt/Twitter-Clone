import React from "react";
import FollowBar from "./layout/FollowBar";

import Sidebar from "./layout/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-black">
      <div className="container h-full mx-auto xl:px-30 max-w-7xl">
        <div className="grid grid-cols-4 md:grid-cols-5 h-full">
          <Sidebar />
          <div className="col-span-7 sm:col-span-3 border-x-[1px] border-neutral-800">
            {children}
          </div>
          <FollowBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
