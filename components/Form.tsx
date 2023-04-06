import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

import useLoginModal from "@/hooks/useLoginModal";
import useTweetModal from "@/hooks/useTweetModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import usePost from "@/hooks/usePost";
import usePosts from "@/hooks/usePosts";
import useCurrentUser from "@/hooks/useCurrentUser";

import Button from "./Button";
import Avatar from "./Avatar";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
  inModal?: boolean;
}

const Form: React.FC<FormProps> = ({
  placeholder,
  isComment,
  postId,
  inModal,
}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const tweetModal = useTweetModal();

  const { data: userLoggedIn } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutateIndividualPost } = usePost(postId as string);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleKeyDown = useCallback(
    (event: any) => {
      if (event.keyCode === 8 && body.length === letterLimit) {
        setBody(body.slice(0, -1));
      }
    },
    [body]
  );

  const letterLimit = 130;
  const handleLetterLimit = (event: any) => {
    if (event.target.value.length > letterLimit) {
      return null;
    }
    setBody(event.target.value);
    handleKeyDown(event);
  };

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts";

      await axios.post(url, { body });

      toast.success("Tweet Created");
      setIsLoading(false);

      setBody("");

      if (tweetModal.isOpen) {
        tweetModal.onClose();
      }

      mutatePosts(); //update posts
      mutateIndividualPost();
    } catch (error) {
      toast.error("Something went wrong");

      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [mutatePosts, body, tweetModal, isComment, postId, mutateIndividualPost]);

  return (
    <div
      className={`${!inModal && "border-b-[1px]"} border-neutral-800 px-5 py-2`}
    >
      {userLoggedIn ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={userLoggedIn?.id} homePage />
          </div>
          <div className="w-full">
            <textarea
              className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 text-[20px] outline-none place-neutral-500 text-white"
              placeholder={placeholder}
              disabled={isLoading}
              onChange={(e) => handleLetterLimit(e)}
              value={body}
            ></textarea>
            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
            <div className="mt-4 flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-4">
                <div className="text-sky-500 text-sm">
                  <p>
                    {body.length}/{letterLimit}
                  </p>
                </div>
              </div>
              <Button
                label="Tweet"
                onClick={onSubmit}
                disabled={isLoading || !body}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8 ">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">
            Welcome to Twitter
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
