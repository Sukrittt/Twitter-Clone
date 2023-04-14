import React from "react";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import Head from "next/head";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import useUser from "@/hooks/useUser";

import Header from "@/components/Header";
import UserHero from "@/components/users/UserHero";
import UserBio from "@/components/users/UserBio";
import PostFeed from "@/components/Posts/PostFeed";

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

const UserProfile = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className="grid place-items-center h-full mt-[45vh]">
        <ClipLoader color="lightblue" size={50} />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          {fetchedUser?.name} (@{fetchedUser?.userName}) / Twitter
        </title>
      </Head>
      <Header
        label={fetchedUser?.name}
        showBackArrow
        userId={userId as string}
      />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
  );
};

export default UserProfile;
