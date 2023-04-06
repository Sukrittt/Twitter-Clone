import React, { useMemo } from "react";
import { format } from "date-fns";
import { BiCalendar } from "react-icons/bi";

import useUser from "@/hooks/useUser";
import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useFollow from "@/hooks/useFollow";

import Button from "../Button";
import { useRouter } from "next/router";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const router = useRouter();

  const { data: userLoggedIn } = useCurrentUser();
  const { data: visitedUser } = useUser(userId);

  const editModal = useEditModal();
  const { isFollowing, toggleFollow } = useFollow(userId);

  const createdAt = useMemo(() => {
    if (!visitedUser?.createdAt) {
      return null;
    }
    return format(new Date(visitedUser?.createdAt), "MMMM yyyy");
  }, [visitedUser?.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {userLoggedIn?.id === visitedUser?.id ? (
          <Button secondary label="Edit" onClick={editModal.onOpen} />
        ) : (
          <Button
            label={isFollowing ? "Following" : "Follow"}
            onClick={toggleFollow}
            secondary={!isFollowing}
            outline={isFollowing}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            {visitedUser?.name}
          </p>
          <p className="text-md text-neutral-500">@{visitedUser?.userName}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">{visitedUser?.bio}</p>
          <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{visitedUser?.followingIds?.length}</p>
            <p
              onClick={() => router.push(`/users/following/${visitedUser?.id}`)}
              className="text-neutral-500 hover:underline transition cursor-pointer"
            >
              Following
            </p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{visitedUser?.userFollowersCount || 0}</p>
            <p
              onClick={() => router.push(`/users/followers/${visitedUser?.id}`)}
              className="text-neutral-500 hover:underline transition cursor-pointer"
            >
              Followers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
