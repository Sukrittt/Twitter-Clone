import React from "react";
import { ClipLoader } from "react-spinners";

import usePosts from "@/hooks/usePosts";
import useGetTweets from "@/hooks/useGetTweets";
import useTweetSwitch from "@/hooks/useTweetSwitch";

import PostItem from "./PostItem";
import ToggleSection from "../users/ToggleSection";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const pageSwitchModal = useTweetSwitch();

  const { data: posts = [], isLoading } = usePosts(userId);
  const { data: tweetedPosts = [], isLoading: isTweetLoading } =
    useGetTweets(userId);

  if (isLoading || isTweetLoading) {
    return (
      <div className="flex justify-center items-start mt-20">
        <ClipLoader color="lightblue" size={40} />
      </div>
    );
  }

  return (
    <>
      {userId && (
        <ToggleSection
          labelOne="Tweets"
          labelTwo="Retweets"
          visitLinkOne={pageSwitchModal.onOpen}
          visitLinkTwo={pageSwitchModal.onClose}
          isActive={pageSwitchModal.isOpen}
        />
      )}
      {pageSwitchModal.isOpen
        ? posts.map((post: Record<string, any>) => (
            <PostItem key={post.id} userId={userId as string} data={post} />
          ))
        : userId &&
          tweetedPosts.map((post: Record<string, any>) => (
            <PostItem
              key={post.id}
              userId={userId as string}
              data={post}
              retweet
            />
          ))}
    </>
  );
};

export default PostFeed;
