import { useState, useRef, useEffect, useCallback } from "react";
import useConfirmModal from "../../../../../../../4_Shared/model/useModalHandler";
import putImage from "../../../../../../../3_Entity/Account/putImage";

const useImageModal = (
  image,
  errorMessage,
  imagePreview,
  imageFile,
  handleImageChange
) => {
  const [confirmModal, handleConfirmModalOpen, handleConfirmModalClose] =
    useConfirmModal();
  const [message, setMessage] = useState("");
  const imageRef = useRef(image); // 초기 값 설정
  const closeRef = useRef(null);

  useEffect(() => {
    imageRef.current = image;
  }, [image]);

  const handleImageConfirmModalOpen = useCallback(
    (handleClose) => {
      handleConfirmModalOpen();
      closeRef.current = handleClose;
    },
    [handleConfirmModalOpen]
  );

  const handleImageConfirmModalDone = useCallback(() => {
    handleConfirmModalClose();
    if (closeRef.current) closeRef.current();
  }, [handleConfirmModalClose]);

  const handleModifyClick = useCallback(
    async (handleClose) => {
      if (errorMessage) {
        setMessage(errorMessage);
        handleConfirmModalOpen();
        return;
      }

      // 이미지가 변경되지 않은 경우 처리
      if (imageRef.current === imagePreview) {
        setMessage("사진을 변경하세요");
        handleConfirmModalOpen();
        return;
      }

      try {
        const result = await putImage(imageFile);

        if (result) {
          setMessage("변경되었습니다");
          handleImageChange(imageFile);
          handleImageConfirmModalOpen(handleClose);
        } else {
          throw new Error("이미지 업로드 실패");
        }
      } catch (error) {
        setMessage(error.message || "오류가 발생했습니다.");
        handleConfirmModalOpen();
      }
    },
    [
      errorMessage,
      imageFile,
      imagePreview,
      handleImageChange,
      handleConfirmModalOpen,
      handleImageConfirmModalOpen,
    ]
  );

  return {
    message,
    confirmModal,
    handleModifyClick,
    handleImageConfirmModalDone,
  };
};

export default useImageModal;
