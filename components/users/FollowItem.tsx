import React from "react";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Avatar from "../Avatar";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

interface FollowItemProps {
  user: Record<string, any>;
}

const FollowItem: React.FC<FollowItemProps> = ({ user }) => {
  const router = useRouter();

  return (
    <div className="p-4 flex gap-4 justify-between hover:bg-neutral-900/50 transition cursor-pointer">
      <div className="flex gap-4">
        <Avatar userId={user?.id} homePage />
        <div className="flex flex-col">
          <p
            onClick={() => router.push(`/users/${user?.id}`)}
            className="text-white text-md font-semibold cursor-pointer hover:underline transition"
          >
            {user?.name}
          </p>
          <p className="text-md text-neutral-500">@{user?.userName}</p>
          <p className="text-slate-200">{user?.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default FollowItem;
