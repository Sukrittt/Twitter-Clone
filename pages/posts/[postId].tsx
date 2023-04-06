import React from "react";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import Head from "next/head";

import usePost from "@/hooks/usePost";

import Header from "@/components/Header";
import PostItem from "@/components/Posts/PostItem";
import Form from "@/components/Form";
import CommentFeed from "@/components/Posts/CommentFeed";

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  return (
    <>
      <Head>
        <title>{fetchedPost?.user?.name} on Twitter</title>
      </Head>
      <Header label="Tweet" showBackArrow />
      {isLoading || !fetchedPost ? (
        <div className="flex justify-center items-center h-[70vh]">
          <ClipLoader color="lightblue" size={40} />
        </div>
      ) : (
        <>
          <PostItem data={fetchedPost} />
          <Form
            postId={postId as string}
            isComment
            placeholder="Tweet your reply"
          />
          <CommentFeed comments={fetchedPost?.coments} />
        </>
      )}
    </>
  );
};

export default PostView;
