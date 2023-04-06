import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useFollowInfo = (userId: string, type: string) => {
  const url = userId ? `/api/users/${type}/${userId}` : null;

  const { data, isLoading, mutate, error } = useSWR(url, fetcher);

  return { data, isLoading, mutate, error };
};

export default useFollowInfo;
