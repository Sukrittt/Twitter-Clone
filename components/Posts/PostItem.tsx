import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { formatDistanceToNowStrict } from "date-fns";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineMessage,
  AiOutlineDelete,
} from "react-icons/ai";
import { FaRetweet } from "react-icons/fa";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useDeleteProps from "@/hooks/useDeleteProps";
import useDeleteModal from "@/hooks/useDeleteModal";
import useRetweet from "@/hooks/useRetweet";
import useLike from "@/hooks/useLike";

import Avatar from "../Avatar";
import useGetTweets from "@/hooks/useGetTweets";

interface PostItemProps {
  userId?: string;
  retweet?: boolean;
  data: Record<string, any>;
}

const PostItem: React.FC<PostItemProps> = ({ userId, data, retweet }) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const deleteModal = useDeleteModal();
  const deleteProps = useDeleteProps();

  const { data: userLoggedIn } = useCurrentUser();
  const { data: tweetedPosts } = useGetTweets(userLoggedIn?.id);

  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });
  const { hasTweeted, toggleRetweetPosts } = useRetweet({
    postId: data.id,
    userId: userLoggedIn?.id,
  });

  const visitUserProfile = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push(`/users/${data.user.id}`);
    },
    [data.user.id, router]
  );

  const visitPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const handleDeletePost = (type: string, id: string, event: any) => {
    event.stopPropagation();
    deleteProps.setId(id);
    deleteProps.setType(type);

    deleteModal.onOpen();
  };

  const handleLikePost = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (!userLoggedIn) {
        return loginModal.onOpen();
      }

      toggleLike();
    },
    [loginModal, userLoggedIn, toggleLike]
  );

  const handleRetweetPost = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (!userLoggedIn) {
        return loginModal.onOpen();
      }

      toggleRetweetPosts();
    },
    [toggleRetweetPosts, loginModal, userLoggedIn]
  );

  const HeartIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  return (
    <div
      onClick={visitPost}
      className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} homePage />
        <div>
          {retweet && (
            <div className="flex gap-2 text-neutral-500 font-semibold text-sm">
              <FaRetweet size={19} className="text-neutral-500" />
              <p>You Retweeted</p>
            </div>
          )}
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={visitUserProfile}
              className="text-white font-semibold cursor-pointer text-center hover:underline"
            >
              {data.user.name}
            </p>
            <span
              onClick={visitUserProfile}
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
            >
              @{data.user.userName}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt} ago</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="group flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage
                size={33}
                className="group-hover:bg-sky-500/30 px-2 rounded-full transition"
              />
              <p>{data.coments?.length || 0}</p>
            </div>
            <div
              onClick={handleRetweetPost}
              className="group flex flex-row items-center text-neutral-500
              gap-1 cursor-pointer transition hover:text-green-600"
            >
              <FaRetweet
                size={33}
                className={`group-hover:bg-green-500/30 px-2 rounded-full transition hover:text-green-600 ${
                  hasTweeted ? "text-green-600" : "text-neutral-500"
                }`}
              />
              <p>{data.retweetIds?.length || 0}</p>
            </div>
            <div
              onClick={handleLikePost}
              className="group flex flex-row items-center text-neutral-500
              gap-1 cursor-pointer transition hover:text-red-600"
            >
              <HeartIcon
                size={33}
                className={`group-hover:bg-red-500/30 px-2 rounded-full transition hover:text-red-600 ${
                  hasLiked ? "text-red-600" : "text-neutral-500"
                }`}
              />
              <p>{data.likeIds?.length || 0}</p>
            </div>
            {userLoggedIn?.id === data.userId && (
              <div
                onClick={(event) => handleDeletePost("post", data.id, event)}
                className="flex items-center justify-center text-neutral-500 hover:text-red-800 hover:bg-red-900/30 p-2 rounded-full
      transition cursor-pointer"
              >
                <AiOutlineDelete size={20} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
