import React, { useEffect } from "react";

import useTweetModal from "@/hooks/useTweetModal";

import PostTweetModal from "../PostTweetModal";
import Form from "../Form";

const TweetModal = () => {
  const tweetModal = useTweetModal();

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.code === "Escape") {
        if (!tweetModal.isOpen) {
          tweetModal.onClose();
        }
      }
    });
  }, [tweetModal]);

  const body = <Form placeholder="What's happening?" inModal />;

  return (
    <PostTweetModal
      isOpen={tweetModal.isOpen}
      onClose={tweetModal.onClose}
      body={body}
    />
  );
};

export default TweetModal;
