import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

import usePost from "./usePost";
import usePosts from "./usePosts";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: userLoggedIn } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateAllFetchedPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const likedList = fetchedPost?.likeIds || [];
    return likedList.includes(userLoggedIn?.id);
  }, [fetchedPost?.likeIds, userLoggedIn?.id]);

  const toggleLike = useCallback(async () => {
    if (!userLoggedIn) {
      return loginModal.onOpen();
    }

    try {
      let request;
      if (hasLiked) {
        request = () => axios.delete("/api/like", { data: { postId } });
      } else {
        request = () => axios.post("/api/like", { postId });
      }
      await request();

      mutateFetchedPost();
      mutateAllFetchedPosts();

      toast.success("Success");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }, [
    hasLiked,
    loginModal,
    userLoggedIn,
    postId,
    mutateFetchedPost,
    mutateAllFetchedPosts,
  ]);

  return { hasLiked, toggleLike };
};

export default useLike;
