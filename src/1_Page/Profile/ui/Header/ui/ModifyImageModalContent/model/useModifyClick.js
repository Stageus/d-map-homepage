import { useEffect, useRef } from "react";

const useModifyClick = (
  image,
  errorMessage,
  imagePreviewURL,
  uploadedImageFile,
  handleProfileImageChange,
  setMessage,
  confirmModalToggle,
  handleImageConfirmModalOpen,
  putProfileImage
) => {
  const imageRef = useRef(image);

  useEffect(() => {
    imageRef.current = image;
  }, [image]);

  const handleModifyClick = async (handleClose) => {
    if (errorMessage) {
      setMessage(errorMessage);
      return confirmModalToggle();
    }
    if (imageRef.current === imagePreviewURL) {
      setMessage("사진을 변경하세요");
      return confirmModalToggle();
    }
    await putProfileImage(uploadedImageFile);
    setMessage("변경되었습니다");
    handleProfileImageChange(uploadedImageFile);
    handleImageConfirmModalOpen(handleClose);
  };

  return { handleModifyClick };
};

export default useModifyClick;
