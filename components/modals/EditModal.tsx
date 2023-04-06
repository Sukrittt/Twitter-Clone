import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import useUser from "@/hooks/useUser";
import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";

import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
  const editModal = useEditModal();

  const { data: userLoggedIn } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userLoggedIn?.id);

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");

  //initializing existing fields
  useEffect(() => {
    setName(userLoggedIn?.name);
    setUserName(userLoggedIn?.userName);
    setBio(userLoggedIn?.bio);
    setCoverImage(userLoggedIn?.coverImage);
    setProfileImage(userLoggedIn?.profileImage);
  }, [
    userLoggedIn?.name,
    userLoggedIn?.userName,
    userLoggedIn?.bio,
    userLoggedIn?.location,
    userLoggedIn?.coverImage,
    userLoggedIn?.profileImage,
  ]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.code === "Escape") {
        if (!editModal.isOpen) {
          editModal.onClose();
        }
      }
    });
  }, [editModal]);

  const onSubmit = useCallback(async () => {
    if (name === "") {
      toast.error("Name can't be blank");
      return;
    }

    try {
      setIsLoading(true);

      await axios.patch("/api/edit", {
        name,
        userName,
        bio,
        profileImage,
        coverImage,
      });

      mutateFetchedUser(); //update the data

      toast.success("Updated");

      editModal.onClose();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [
    name,
    userName,
    bio,
    profileImage,
    coverImage,
    mutateFetchedUser,
    editModal,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        imageValue={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        imageType="cover"
      />
      <ImageUpload
        imageValue={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        imageType="profile"
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        isDisbaled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
        isDisbaled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        isDisbaled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
