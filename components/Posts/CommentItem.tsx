import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { formatDistanceToNowStrict } from "date-fns";
import { AiOutlineDelete } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useDeleteModal from "@/hooks/useDeleteModal";

import Avatar from "../Avatar";
import useDeleteProps from "@/hooks/useDeleteProps";

interface CommentItemProps {
  data: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
  const router = useRouter();

  const deleteModal = useDeleteModal();
  const deleteProps = useDeleteProps();

  const { data: userLoggedIn } = useCurrentUser();

  const visitUser = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const handleDeleteComment = (type: string, id: string) => {
    deleteProps.setId(id);
    deleteProps.setType(type);

    deleteModal.onOpen();
  };

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  return (
    <div className="flex justify-between items-center border-b-[1px] border-neutral-800 p-5 hover:bg-neutral-900 transition">
      <div className="flex flex-col lg:flex-row items-start gap-3">
        <Avatar userId={data.user.id} homePage />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={visitUser}
              className="text-white font-semibold cursor-pointer hover:underline"
            >
              {data.user.name}
            </p>
            <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              @{data.user.userName}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt} ago</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
        </div>
      </div>
      {userLoggedIn?.id === data.user.id && (
        <div
          onClick={() => handleDeleteComment("comment", data.id)}
          className="flex items-center justify-center text-neutral-500 hover:text-red-800 hover:bg-red-900/30 p-2 rounded-full
        transition cursor-pointer"
        >
          <AiOutlineDelete size={20} />
        </div>
      )}
    </div>
  );
};

export default CommentItem;
