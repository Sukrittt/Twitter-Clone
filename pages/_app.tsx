import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

import "@/styles/globals.css";

import useDeleteProps from "@/hooks/useDeleteProps";

import Layout from "@/components/Layout";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import EditModal from "@/components/modals/EditModal";
import NavigationModal from "@/components/modals/NavigationModal";
import TweetModal from "@/components/modals/TweetModal";
import DeleteModal from "@/components/modals/DeleteModal";
import LoadingScreen from "@/components/LoadingScreen";

export default function App({ Component, pageProps }: AppProps) {
  const deleteProps = useDeleteProps();
  const router = useRouter();

  return (
    <SessionProvider session={pageProps.session}>
      <LoadingScreen>
        <Toaster />
        <DeleteModal type={deleteProps.type} commentId={deleteProps.id} />
        <TweetModal />
        <NavigationModal />
        <EditModal />
        <RegisterModal />
        <LoginModal />
        <Layout>
          <AnimatePresence mode="wait">
            <motion.div
              key={router.route}
              initial="initialState"
              animate="animateState"
              exit="exitState"
              variants={{
                initialState: {
                  opacity: 0,
                },
                animateState: {
                  opacity: 1,
                },
                exitState: {},
              }}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </Layout>
      </LoadingScreen>
    </SessionProvider>
  );
}
