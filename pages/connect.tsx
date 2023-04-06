import React from "react";
import Head from "next/head";
import { ClipLoader } from "react-spinners";

import useUsers from "@/hooks/useUsers";
import useCurrentUser from "@/hooks/useCurrentUser";

import FollowItem from "@/components/users/FollowItem";
import Header from "@/components/Header";

const Connect = () => {
  let { data: fetchAllUsers = [], isLoading } = useUsers();
  const { data: userLoggedIn } = useCurrentUser();

  fetchAllUsers = fetchAllUsers.filter(
    (item: Record<string, any>) => item?.id !== userLoggedIn?.id
  );

  return (
    <>
      <Head>
        <title>Connect / Twitter</title>
      </Head>
      <Header label="Connect" showBackArrow />
      {isLoading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <ClipLoader color="lightblue" size={40} />
        </div>
      ) : (
        fetchAllUsers?.map((user: Record<string, any>) => (
          <FollowItem key={user.id} user={user} />
        ))
      )}
    </>
  );
};

export default Connect;
