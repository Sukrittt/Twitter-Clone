import React, { useCallback } from "react";
import { FaFeather } from "react-icons/fa";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useTweetModal from "@/hooks/useTweetModal";

const SidebarTweetButton = () => {
  const loginModal = useLoginModal();
  const tweetModal = useTweetModal();

  const { data: userLoggedIn } = useCurrentUser();

  const handleTweet = useCallback(() => {
    if (!userLoggedIn) {
      loginModal.onOpen();
      return;
    }
    tweetModal.onOpen();
  }, [loginModal, tweetModal, userLoggedIn]);

  return (
    <div onClick={handleTweet}>
      <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
        <FaFeather size={24} color="white" />
      </div>
      <div className="mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 hover:bg-opacity-80 cursor-pointer transition">
        <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
