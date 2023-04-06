import React, { useEffect } from "react";

import NavModal from "../NavModal";

import useNavigationModal from "@/hooks/useNavigationModal";

const NavigationModal = () => {
  const navigationModal = useNavigationModal();

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.code === "Escape") {
        if (!navigationModal.isOpen) {
          navigationModal.onClose();
        }
      }
    });
  }, [navigationModal]);

  return (
    <NavModal
      title="Account info"
      isOpen={navigationModal.isOpen}
      onClose={navigationModal.onClose}
    />
  );
};

export default NavigationModal;
