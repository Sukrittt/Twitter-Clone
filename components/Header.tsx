import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";

import useCurrentUser from "@/hooks/useCurrentUser";
import useNavigationModal from "@/hooks/useNavigationModal";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useGetTweets from "@/hooks/useGetTweets";

import Avatar from "./Avatar";

interface HeaderProps {
  label: string;
  showBackArrow?: boolean;
  userId?: string;
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({
  label,
  showBackArrow,
  userId,
  userName,
}) => {
  const router = useRouter();

  const { data: userLoggedIn } = useCurrentUser();
  const { data: userPosts = [] } = usePosts(userId);
  let { data: userRetweets = [] } = useGetTweets(userLoggedIn?.id);

  userRetweets = userRetweets.filter(
    (tweet: Record<string, any>) => tweet.userId != userId
  );

  const navigationModal = useNavigationModal();
  const loginModal = useLoginModal();

  //to got to the previous page
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const authenticationChecker = useCallback(() => {
    if (!userLoggedIn) {
      loginModal.onOpen();
      return;
    }
    navigationModal.onOpen();
  }, [userLoggedIn, loginModal, navigationModal]);

  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-4">
        {showBackArrow && (
          <BiArrowBack
            className="cursor-pointer hover:opacity-70 transition"
            onClick={handleBack}
            color="white"
            size={20}
          />
        )}
        <div className="flex flex-row gap-4 items-center">
          <Avatar
            userId={userLoggedIn?.id}
            onClick={authenticationChecker}
            isSmall
            homePage={router.pathname === "/"}
            hidden
          />
          <div className="flex flex-col">
            <h1 className="text-white text-xl font-semibold">{label}</h1>
            {userId && (
              <span className="text-neutral-500 text-[.8em]">
                {userPosts?.length + userRetweets?.length} Tweets
              </span>
            )}
            {userName && (
              <span className="text-neutral-500 text-[.8em]">@{userName}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
