import React, { useEffect } from "react";
import { BsTwitter } from "react-icons/bs";

import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import { ClipLoader } from "react-spinners";

const NotificationFeed = () => {
  const { data: userLoggedIn, mutate: mutateUserDetails } = useCurrentUser();
  const { data: fetchedNotifications = [], isLoading } = useNotifications(
    userLoggedIn?.id
  );

  //mutate user data every time the api call is hit
  useEffect(() => {
    mutateUserDetails();
  }, [mutateUserDetails]);

  if (fetchedNotifications.length === 0 && !isLoading) {
    return (
      <div className="text-white text-center w-full p-7 text-3xl font-bold">
        Nothing to see here <br /> — yet
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-start mt-[20vh]">
        <ClipLoader color="lightblue" size={30} />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div
          key={notification.id}
          className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
        >
          <BsTwitter size={32} color="white" />
          <p className="text-white">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationFeed;
