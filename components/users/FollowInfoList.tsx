import React from "react";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import { useRouter } from "next/router";

import FollowItem from "./FollowItem";
import Button from "../Button";

interface FollowInfoListProps {
  data: Record<string, any>[];
  isLoading?: boolean;
}

const FollowInfoList: React.FC<FollowInfoListProps> = ({ data, isLoading }) => {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <ClipLoader color="lightblue" size={40} />
      </div>
    );
  }

  if (!isLoading && data?.length === 0) {
    return (
      <div className="flex flex-col justify-center md:items-center items-start mx-5 h-[60vh] gap-9">
        {router.pathname.includes("followers") && (
          <Image
            src="/images/follow_placeholder.png"
            alt="empty_followers"
            height={400}
            width={400}
          />
        )}
        <div className="flex flex-col gap-8 w-full md:w-3/6">
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-4xl font-bold">
              {router.pathname.includes("followers")
                ? "Looking for followers?"
                : "Be in the know"}
            </h1>
            <span className="text-neutral-500">
              {router.pathname.includes("followers")
                ? "When someone follows this account, they’ll show up here. Tweeting and interacting with others helps boost followers."
                : "Following accounts is an easy way to curate your timeline and know what’s happening with the topics and people you’re interested in."}
            </span>
          </div>
          {!router.pathname.includes("followers") && (
            <Button
              label="Find people to follow"
              bold
              onClick={() => router.push("/connect")}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {data?.map((item) => (
        <FollowItem key={item.id} user={item} />
      ))}
    </div>
  );
};

export default FollowInfoList;
