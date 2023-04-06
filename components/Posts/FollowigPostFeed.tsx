import React from "react";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/router";

import useFollowingPosts from "@/hooks/useFollowingPosts";

import PostItem from "./PostItem";
import Button from "../Button";

interface FollowigPostFeedProps {
  userId: string;
  isActive?: boolean;
}

const FollowigPostFeed: React.FC<FollowigPostFeedProps> = ({
  userId,
  isActive,
}) => {
  const { data: followingPosts = [], isLoading } = useFollowingPosts(userId);
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex justify-center items-start mt-20">
        <ClipLoader color="lightblue" size={40} />
      </div>
    );
  }

  if (!isLoading && followingPosts?.length === 0) {
    return (
      <div className="flex flex-col justify-center md:items-center items-start mx-5 h-[40vh] gap-9">
        <div className="flex flex-col gap-6 w-full md:w-3/6">
          {!isActive && (
            <>
              <div className="flex flex-col gap-2">
                <h1 className="text-white text-4xl font-bold">
                  Welcome to Twitter!
                </h1>
                <span className="text-neutral-500">
                  This is the best place to see what’s happening in your world.
                  Find some people and topics to follow now.
                </span>
              </div>
              <Button
                label="Let's go"
                onClick={() => router.push("/connect")}
                large
                fullWidth
              />
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {followingPosts.map((post: Record<string, any>) => (
        <PostItem key={post.id} userId={userId as string} data={post} />
      ))}
    </>
  );
};

export default FollowigPostFeed;
