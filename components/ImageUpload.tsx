import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  onChange: (base64: string) => void;
  imageValue?: string;
  disabled?: boolean;
  imageType?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  imageValue,
  disabled,
  imageType,
}) => {
  const [base64, setBase64] = useState(imageValue);

  const handleImageChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleFileDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();

      //image reading completion
      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleImageChange(event.target.result);
      };

      reader.readAsDataURL(file);
    },
    [handleImageChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleFileDrop,
    disabled: disabled,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <div className="-mt-5">
      <input {...getInputProps()} />
      <div
        {...getRootProps({
          className: `flex cursor-pointer relative
                  ${
                    imageType === "profile"
                      ? "w-20 h-20 -mt-10 rounded-none border-none"
                      : "h-40"
                  }`,
        })}
      >
        <Image
          src={`${
            imageType === "profile"
              ? base64 || "/images/placeholder.png"
              : base64 || "/images/cover.png"
          }`}
          height={100}
          width={100}
          className="w-full border-black border-[3px]"
          alt="Uploaded Image"
          style={{
            objectFit: "cover",
            borderRadius: `${imageType === "profile" && "100%"}`,
          }}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
