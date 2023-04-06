import React, { useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import useUser from "@/hooks/useUser";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
  isSmall?: boolean;
  onClick?: () => void;
  homePage?: boolean;
  hidden?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  userId,
  isLarge,
  hasBorder,
  onClick,
  isSmall,
  hidden,
  homePage,
}) => {
  const router = useRouter();
  const { data: fetchedUser } = useUser(userId);

  //redirect to user profile
  const onProfileClick = useCallback(
    (event: any) => {
      if (onClick) {
        onClick();
        return;
      }

      event.stopPropagation();

      const url = `/users/${userId}`;
      router.push(url);
    },
    [router, userId, onClick]
  );
  return (
    <div
      className={`
    ${hasBorder ? "border-4 border-black" : ""}
    ${isLarge ? "h-32 w-32 " : "h-12 w-12"}
    ${isSmall && "h-10 w-10 "}
    ${homePage ? "visible" : "hidden"}
    ${hidden && "sm:hidden"}
    rounded-full hover:opacity-90 transition cursor-pointer relative block
            `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="avatar"
        onClick={onProfileClick}
        src={fetchedUser?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
