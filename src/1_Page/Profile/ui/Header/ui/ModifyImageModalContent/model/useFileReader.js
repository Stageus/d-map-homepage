import { useEffect, useRef, useState, useCallback } from "react";

const useFileReader = (initialImage) => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(initialImage);
  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif"];

  useEffect(() => {
    setImagePreview(initialImage);
  }, [initialImage]);

  const handleProfileImageClick = () => fileInputRef.current?.click();

  const validateFile = (file) => {
    if (!file) return false;

    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      setErrorMessage(
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
      setImagePreview(null);
      setImageFile(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setImagePreview(objectUrl);
    setImageFile(selectedFile);

    return () => URL.revokeObjectURL(objectUrl); // 메모리 누수 방지
  };

  return {
    imageFile,
    fileInputRef,
    imagePreview,
    errorMessage,
    handleProfileImageClick,
    handleFileChange,
  };
};

export default useFileReader;
