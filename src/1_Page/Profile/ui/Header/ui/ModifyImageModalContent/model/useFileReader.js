import { useEffect, useRef, useState } from "react";

const useFileReader = (initialImage, showModalWithText) => {
  const fileInputRef = useRef(null);
  const [imagePreviewURL, setImagePreviewURL] = useState(initialImage);
  const [uploadedImageFile, setUploadedImageFile] = useState(null);

  const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif"];
  const FILE_NAME_MIN_LENGTH = 2;
  const FILE_NAME_MAX_LENGTH = 20;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB (단위: 바이트)

  useEffect(() => {
    setImagePreviewURL(initialImage);
  }, [initialImage]);

  const handleProfileImageClick = () => fileInputRef.current?.click();

  const validateFile = (file) => {
    if (!file) {
      showModalWithText("파일이 선택되지 않았습니다.");

      return false;
    }

    // 파일 이름 길이 검증 (2~20자)
    const fileNameWithoutExtension = file.name
      .split(".")
      .slice(0, -1)
      .join(".");

    if (
      fileNameWithoutExtension.length < FILE_NAME_MIN_LENGTH ||
      fileNameWithoutExtension.length > FILE_NAME_MAX_LENGTH
    ) {
      showModalWithText(
        `파일 이름은 ${FILE_NAME_MIN_LENGTH}자 이상 ${FILE_NAME_MAX_LENGTH}자 이하이어야 합니다.`
      );

      return false;
    }

    // 파일 크기 검증 (최대 5MB 제한)
    if (file.size > MAX_FILE_SIZE) {
      showModalWithText(
        `파일 크기가 너무 큽니다. 최대 ${
          MAX_FILE_SIZE / (1024 * 1024)
        }MB까지 업로드 가능합니다.`
      );

      return false;
    }

    // 파일 확장자 검증
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      showModalWithText(
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
      setImagePreviewURL(initialImage);
      setUploadedImageFile(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setImagePreviewURL(objectUrl);
    setUploadedImageFile(selectedFile);

    return () => URL.revokeObjectURL(objectUrl); // 메모리 누수 방지
  };

  const validateImageChange = () => {
    if (initialImage === imagePreviewURL) {
      showModalWithText("사진을 변경하세요");

      return false;
    }
    return true;
  };

  useEffect(() => {
    return () => {
      if (imagePreviewURL && imagePreviewURL !== initialImage) {
        URL.revokeObjectURL(imagePreviewURL);
      }
    };
  }, [imagePreviewURL, initialImage]);

  return [
    uploadedImageFile,
    fileInputRef,
    imagePreviewURL,
    handleProfileImageClick,
    handleFileChange,
    validateImageChange,
  ];
};

export default useFileReader;
