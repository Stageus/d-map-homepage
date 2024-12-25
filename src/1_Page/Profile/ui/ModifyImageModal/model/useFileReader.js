import { useRef, useState } from "react";

const useFileReader = () => {
  const fileInputRef = useRef(null);

  const [imagePreview, setImagePreview] = useState(null);

  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
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
    handleProfileImageClick,
    handleFileChange,
  };
};
export default useFileReader;
