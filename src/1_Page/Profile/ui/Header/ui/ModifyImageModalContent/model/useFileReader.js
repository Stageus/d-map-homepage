import { useEffect, useRef, useState } from "react";

const useFileReader = (initialImage, message, setMessage) => {
  const fileInputRef = useRef(null);
  const [imagePreviewURL, setImagePreviewURL] = useState(initialImage);
  const [uploadedImageFile, setUploadedImageFile] = useState(null);

  const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif"];

  useEffect(() => {
    setImagePreviewURL(initialImage);
  }, [initialImage]);

  const handleProfileImageClick = () => fileInputRef.current?.click();

  const validateFile = (file) => {
    if (!file) return false;

    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      setMessage(
        `허용되지 않는 파일 형식입니다. ${ALLOWED_EXTENSIONS.join(
          ", "
        )}만 업로드 가능합니다.`
      );
      return false;
    }
    return true;
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile || !validateFile(selectedFile)) {
      setImagePreviewURL(null);
      setUploadedImageFile(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setImagePreviewURL(objectUrl);
    setUploadedImageFile(selectedFile);

    return () => URL.revokeObjectURL(objectUrl); // 메모리 누수 방지
  };

  const imageRef = useRef(initialImage);

  useEffect(() => {
    imageRef.current = initialImage;
  }, [initialImage]);

  const validateImageChange = () => {
    if (imageRef.current === imagePreviewURL) {
      setMessage("사진을 변경하세요");
      return false;
    }
    return true;
  };

  return {
    uploadedImageFile,
    fileInputRef,
    imagePreviewURL,
    handleProfileImageClick,
    handleFileChange,
    validateImageChange,
  };
};

export default useFileReader;
