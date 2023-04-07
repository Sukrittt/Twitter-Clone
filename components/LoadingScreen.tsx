import React, { useEffect, useState } from "react";
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
      {!loading && (
        <div className="absolute h-full w-full grid place-items-center text-sky-500 bg-black z-50 overflow-hidden">
          <BsTwitter size={70} />
        </div>
      )}
    </>
  );
};

export default LoadingScreen;
