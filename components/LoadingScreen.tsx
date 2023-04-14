import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsTwitter } from "react-icons/bs";

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            initial="initialState"
            animate="animateState"
            exit="exitState"
            variants={{
              animateState: { opacity: 1 },
              exitState: { opacity: 0 },
            }}
            className="absolute h-full w-full grid place-items-center text-sky-500 bg-black z-50 overflow-hidden"
          >
            <motion.div
              initial="initialState"
              animate="animateState"
              exit="exitState"
              variants={{
                initialState: { opacity: 0 },
                animateState: { opacity: 1, y: 5 },
                exitState: { opacity: 0, y: 0 },
              }}
            >
              <BsTwitter size={70} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LoadingScreen;
