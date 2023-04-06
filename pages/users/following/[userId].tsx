import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import useUser from "@/hooks/useUser";
import useFollowInfo from "@/hooks/useFollowInfo";

import Header from "@/components/Header";
import ToggleSection from "@/components/users/ToggleSection";
import FollowInfoList from "@/components/users/FollowInfoList";

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

const Followings = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: currentUser } = useUser(userId as string);
  const { data: followList, isLoading } = useFollowInfo(
    userId as string,
    "following"
  );

  return (
    <>
      <Head>
        <title>
          People followed by {currentUser?.name} (@{currentUser?.userName})
        </title>
      </Head>
      <Header
        label={currentUser?.name}
        showBackArrow
        userName={currentUser?.userName}
      />
      <ToggleSection
        labelOne="Followers"
        labelTwo="Following"
        visitLinkOne={() => router.push(`/users/followers/${userId}`)}
        visitLinkTwo={() => router.push(`/users/following/${userId}`)}
      />
      <FollowInfoList data={followList} isLoading={isLoading} />
    </>
  );
};

export default Followings;
