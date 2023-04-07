import React from "react";
import Head from "next/head";
import { ClipLoader } from "react-spinners";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import useUsers from "@/hooks/useUsers";
import useCurrentUser from "@/hooks/useCurrentUser";

import FollowItem from "@/components/users/FollowItem";
import Header from "@/components/Header";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

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
      {fetchAllUsers.length === 0 && !isLoading && (
        <div className="mt-6 text-white text-center w-full p-7 text-3xl font-bold">
          Nothing to see here <br /> — yet
        </div>
      )}
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
