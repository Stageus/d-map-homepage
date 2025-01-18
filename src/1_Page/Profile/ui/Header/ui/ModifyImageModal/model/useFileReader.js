import { useEffect, useRef, useState } from "react";

const useFileReader = (image) => {
  const fileInputRef = useRef(null);

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); // 에러 메시지 상태

  useEffect(() => {
    setImagePreview(image);
  }, [image]);

  const allowedExtensions = ["jpg", "jpeg", "png", "gif"]; // 허용 확장자

  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        setErrorMessage(
          `허용되지 않는 파일 형식입니다. ${allowedExtensions.join(
            ", "
          )}만 업로드 가능합니다.`
        );
        setImagePreview(null); // 이전 프리뷰 초기화
        setImageFile(null);
        return;
      }
      setErrorMessage(null); // 에러 초기화
      // Object URL로 미리보기 설정
      const objectUrl = URL.createObjectURL(selectedFile);
      setImagePreview(objectUrl);
      setImageFile(selectedFile);
      // URL을 사용한 후 메모리 해제
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  };
  return {
    imageFile,
    fileInputRef,
    imagePreview,
    setImagePreview,
    errorMessage,
    handleProfileImageClick,
    handleFileChange,
  };
};

export default useFileReader;
