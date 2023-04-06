import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useFollowingPosts = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/posts/followingPosts/${userId}`,
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useFollowingPosts;
