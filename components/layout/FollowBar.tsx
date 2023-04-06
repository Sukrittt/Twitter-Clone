import React from "react";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import useUsers from "@/hooks/useUsers";

import Avatar from "../Avatar";

const FollowBar = () => {
  let { data: listOfAllUsers = [], isLoading } = useUsers();
  const router = useRouter();

  let allUsersList = listOfAllUsers;
  const maxUserDisplay = 3;
  listOfAllUsers = listOfAllUsers.slice(0, 3);

  if (listOfAllUsers.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {isLoading ? (
            <div className="flex justify-center items-center my-[10vh] h-full">
              <ClipLoader color="lightblue" size={30} />
            </div>
          ) : (
            <>
              {listOfAllUsers.map((user: Record<string, any>) => (
                <div className="flex flex-row gap-4" key={user.id}>
                  <Avatar userId={user.id} homePage />
                  <div className="flex flex-col">
                    <p
                      onClick={() => router.push(`/users/${user.id}`)}
                      className="text-white font-semibold text-sm hover:underline cursor-pointer transition"
                    >
                      {user.name}
                    </p>
                    <p className="text-neutral-400 text-sm">@{user.userName}</p>
                  </div>
                </div>
              ))}
              {allUsersList.length > maxUserDisplay && (
                <span
                  onClick={() => router.push("/connect")}
                  className="text-sky-500 text-sm cursor-pointer"
                >
                  Show more
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
