import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useGetTweets = (userId?: string) => {
  const url = userId ? `/api/posts/retweets/${userId}` : null;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return { data, error, isLoading, mutate };
};

export default useGetTweets;
