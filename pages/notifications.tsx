import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

import Header from "@/components/Header";
import NotificationFeed from "@/components/notification/NotificationFeed";

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

const notifications = () => {
  return (
    <>
      <Head>
        <title>Notifications / Twitter</title>
      </Head>
      <Header label="Notifications" showBackArrow />
      <NotificationFeed />
    </>
  );
};

export default notifications;
