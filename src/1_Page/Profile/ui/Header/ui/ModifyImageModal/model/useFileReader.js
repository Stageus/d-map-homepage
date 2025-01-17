import { useEffect, useRef, useState } from "react";

const useFileReader = (image) => {
  const fileInputRef = useRef(null);

  const [imagePreview, setImagePreview] = useState(null);
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
        return;
      }

      setErrorMessage(null); // 에러 초기화
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Base64로 변환된 이미지 데이터 저장
      };
      reader.readAsDataURL(selectedFile); // 파일을 Base64로 읽기
    }
  };

  return {
    fileInputRef,
    imagePreview,
    errorMessage,
    handleProfileImageClick,
    handleFileChange,
  };
};

export default useFileReader;
