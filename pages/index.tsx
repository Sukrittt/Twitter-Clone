import Head from "next/head";

import usePageSwitch from "@/hooks/usePageSwitch";
import useCurrentUser from "@/hooks/useCurrentUser";

import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/Posts/PostFeed";
import ToggleSection from "@/components/users/ToggleSection";
import FollowigPostFeed from "@/components/Posts/FollowigPostFeed";

export default function Home() {
  const pageSwitchModal = usePageSwitch();
  const { data: userLoggedIn } = useCurrentUser();

  return (
    <>
      <Head>
        <title>Home / Twitter</title>
      </Head>
      <Header label="Home" />
      <ToggleSection
        labelOne="For You"
        labelTwo="Following"
        visitLinkOne={pageSwitchModal.onOpen}
        visitLinkTwo={pageSwitchModal.onClose}
        isActive={pageSwitchModal.isOpen}
      />
      <Form placeholder="What's Happening?" />
      {pageSwitchModal.isOpen ? (
        <PostFeed />
      ) : (
        <FollowigPostFeed
          userId={userLoggedIn?.id}
          isActive={pageSwitchModal.isOpen}
        />
      )}
    </>
  );
}
