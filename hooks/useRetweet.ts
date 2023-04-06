import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

import usePost from "./usePost";
import usePosts from "./usePosts";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useGetTweets from "./useGetTweets";

const useRetweet = ({ postId, userId }: { postId: string; userId: string }) => {
  const { data: userLoggedIn } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);

  const { mutate: mutateAllFetchedPosts } = usePosts(userId);
  const { mutate: mutateRetweetPosts } = useGetTweets(userId);

  const loginModal = useLoginModal();

  const hasTweeted = useMemo(() => {
    const retweetIds = fetchedPost?.retweetIds || [];

    return retweetIds.includes(userLoggedIn?.id);
  }, [fetchedPost?.retweetIds, userLoggedIn?.id]);

  const toggleRetweetPosts = useCallback(async () => {
    if (!userLoggedIn) {
      loginModal.onOpen();
    }

    try {
      let request;
      if (hasTweeted) {
        request = () =>
          axios.delete("/api/posts/retweets", {
            data: { postId },
          });
      } else {
        request = () => axios.post("/api/posts/retweets", { postId });
      }

      await request();

      mutateFetchedPost();
      mutateAllFetchedPosts();
      mutateRetweetPosts();

      toast.success("Success");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }, [
    userLoggedIn,
    loginModal,
    hasTweeted,
    postId,
    mutateFetchedPost,
    mutateAllFetchedPosts,
    mutateRetweetPosts,
  ]);

  return { hasTweeted, toggleRetweetPosts };
};

export default useRetweet;
