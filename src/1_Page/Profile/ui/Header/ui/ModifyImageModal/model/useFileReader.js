import { useEffect, useRef, useState, useCallback } from "react";

const useFileReader = (initialImage) => {
  const fileInputRef = useRef(null);

  const [imagePreview, setImagePreview] = useState(initialImage);
  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const allowedExtensions = useRef(["jpg", "jpeg", "png", "gif"]); // 허용 확장자를 useRef로 고정

  useEffect(() => {
    setImagePreview(initialImage);
  }, [initialImage]);

  const handleProfileImageClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.current.includes(fileExtension)) {
      setErrorMessage(
        `허용되지 않는 파일 형식입니다. ${allowedExtensions.current.join(
          ", "
        )}만 업로드 가능합니다.`
      );
      setImagePreview(null); // 이전 프리뷰 초기화
      setImageFile(null);
      return;
    }

    setErrorMessage(null); // 에러 초기화
    const objectUrl = URL.createObjectURL(selectedFile);
    setImagePreview(objectUrl);
    setImageFile(selectedFile);

    return () => {
      URL.revokeObjectURL(objectUrl); // 메모리 누수 방지
    };
  }, []);

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
