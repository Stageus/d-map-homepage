import { useState, useRef, useEffect } from "react";
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

  const imageRef = useRef(null); // 현재 이미지 설정
  useEffect(() => {
    imageRef.current = image;
  }, [image]);

  const closeRef = useRef(null);

  const handleImageConfirmModalOpen = (handleClose) => {
    handleConfirmModalOpen();
    closeRef.current = handleClose;
  };
  const handleImageConfirmModalDone = () => {
    handleConfirmModalClose();
    if (closeRef.current) closeRef.current();
  };

  const handleModifyClick = async (handleClose) => {
    if (errorMessage) {
      setMessage(errorMessage);
      handleConfirmModalOpen();
    }
    // 이미지 수정하지 않은 경우 예외처리
    if (imageRef.current == imagePreview) {
      setMessage("사진을 변경하세요");
      handleConfirmModalOpen();
      return;
    }
    const result = await putImage(imageFile);
    if (result) {
      setMessage("변경되었습니다");
      handleImageChange(imageFile);
      handleImageConfirmModalOpen(handleClose);
      return;
    }
    setMessage(result);
    handleConfirmModalOpen();
  };

  return {
    message,
    confirmModal,
    handleModifyClick,
    handleImageConfirmModalDone,
  };
};

export default useImageModal;
