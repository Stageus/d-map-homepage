import { useEffect, useRef, useState } from "react";

const useFileReader = (defaultImage, showModal) => {
  const fileInputRef = useRef(null);
  const [previewURL, setPreviewURL] = useState(defaultImage);
  const [selectedFile, setSelectedFile] = useState(null);

  const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif"];
  const MIN_NAME_LENGTH = 2;
  const MAX_NAME_LENGTH = 20;
  const MAX_SIZE_MB = 5;
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

  useEffect(() => {
    setPreviewURL(defaultImage);
  }, [defaultImage]);

  const openFileSelector = () => fileInputRef.current?.click();

  const isValidFile = (file) => {
    if (!file) {
      showModal("파일이 선택되지 않았습니다.");
      return false;
    }

    const fileName = file.name.split(".").slice(0, -1).join(".");
    if (
      fileName.length < MIN_NAME_LENGTH ||
      fileName.length > MAX_NAME_LENGTH
    ) {
      showModal(
        `파일 이름은 ${MIN_NAME_LENGTH}자 이상 ${MAX_NAME_LENGTH}자 이하로 입력하세요.`
      );
      return false;
    }

    if (file.size > MAX_SIZE_BYTES) {
      showModal(
        `파일 크기가 너무 큽니다. 최대 ${MAX_SIZE_MB}MB까지만 업로드 가능합니다.`
      );
      return false;
    }

    const extension = file.name.split(".").pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      showModal(
        `허용되지 않는 파일 형식입니다. (${ALLOWED_EXTENSIONS.join(
          ", "
        )})만 업로드 가능합니다.`
      );
      return false;
    }

    return true;
  };

  const changeImage = async (input) => {
    if (typeof input === "string") {
      try {
        // 이미지 URL로부터 Blob 데이터 가져오기
        const response = await fetch(input);
        const blob = await response.blob();
        // Blob으로 File 객체 생성
        const defaultFile = new File([blob], "default_image.png", {
          type: blob.type,
        });

        setPreviewURL(input);
        setSelectedFile(defaultFile);
      } catch (error) {
        console.error("기본 이미지 로드 오류:", error);
      }
    } else {
      const objectURL = URL.createObjectURL(input);
      setPreviewURL(objectURL);
      setSelectedFile(input);

      // 메모리 누수 방지
      return () => URL.revokeObjectURL(objectURL);
    }
  };

  const handleFileSelection = (event) => {
    const file = event.target.files?.[0];
    if (!file || !isValidFile(file)) {
      setPreviewURL(defaultImage);
      setSelectedFile(null);
      return;
    }
    changeImage(file);
  };

  const validateImageChange = () => {
    if (defaultImage === previewURL) {
      showModal("새 이미지를 선택해주세요.");
      return false;
    }
    return true;
  };

  useEffect(() => {
    return () => {
      if (previewURL && previewURL !== defaultImage) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [previewURL, defaultImage]);

  return [
    selectedFile,
    fileInputRef,
    previewURL,
    openFileSelector,
    handleFileSelection,
    validateImageChange,
    changeImage,
  ];
};

export default useFileReader;
