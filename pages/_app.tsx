import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

import "@/styles/globals.css";

import useDeleteProps from "@/hooks/useDeleteProps";

import Layout from "@/components/Layout";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import EditModal from "@/components/modals/EditModal";
import NavigationModal from "@/components/modals/NavigationModal";
import TweetModal from "@/components/modals/TweetModal";
import DeleteModal from "@/components/modals/DeleteModal";

export default function App({ Component, pageProps }: AppProps) {
  const deleteProps = useDeleteProps();

  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <DeleteModal type={deleteProps.type} commentId={deleteProps.id} />
      <TweetModal />
      <NavigationModal />
      <EditModal />
      <RegisterModal />
      <LoginModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
