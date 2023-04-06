import React from "react";
import { useRouter } from "next/router";

import Avatar from "../Avatar";

import useNavigationModal from "@/hooks/useNavigationModal";
import useUser from "@/hooks/useUser";

interface NavUserDetailsProps {
  userLoggedIn: Record<string, any>;
}

const NavUserDetails: React.FC<NavUserDetailsProps> = ({ userLoggedIn }) => {
  const router = useRouter();
  const navigationModal = useNavigationModal();

  const handleRedirectPage = () => {
    if (userLoggedIn) {
      navigationModal.onClose();
      router.push(`/users/${userLoggedIn?.id}`);
    }
  };

  const { data: currentUser } = useUser(userLoggedIn?.id as string);

  return (
    <>
      <div className="mt-5 flex flex-col gap-2">
        <Avatar
          userId={currentUser?.id}
          isSmall
          homePage
          onClick={handleRedirectPage}
        />
        <div>
          <p className="text-white font-semibold text-xl">
            {currentUser?.name}
          </p>
          <p className="text-md text-neutral-500">@{currentUser?.userName}</p>
        </div>
      </div>
      <div className="flex gap-5 mt-3 text-sm">
        <div className="flex gap-1">
          <p className="text-white">{currentUser?.followingIds?.length}</p>
          <p className="text-neutral-500">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="text-white">{currentUser?.userFollowersCount || 0}</p>
          <p className="text-neutral-500">Followers</p>
        </div>
      </div>
    </>
  );
};

export default NavUserDetails;
