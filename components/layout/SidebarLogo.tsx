import { useRouter } from "next/router";
import React from "react";
import { BsTwitter } from "react-icons/bs";

const SidebarLogo = () => {
  const router = useRouter(); //routing purposes

  return (
    <div
      onClick={() => router.push("/")}
      className="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-blue-300/10 cursor-pointer transition"
    >
      <BsTwitter size={28} color="white" />
    </div>
  );
};

export default SidebarLogo;
