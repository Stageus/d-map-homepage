import { useState, useRef, useEffect } from "react";
import useConfirmModal from "../../../../../../../4_Shared/model/useModalHandler";
import useModifyImage from "../../../../../../../3_Entity/Profile/useModifyImage";

const useImageModal = (image, errorMessage, imagePreview) => {
  const [confirmModal, handleConfirmModalOpen, handleConfirmModalClose] =
    useConfirmModal();
  const { modify, loading, error } = useModifyImage();

  const [message, setMessage] = useState("");

  const imageRef = useRef(null);
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
    if (imageRef.current == imagePreview) {
      setMessage("사진을 변경하세요");
      handleConfirmModalOpen();
      return;
    }
    const result = await modify(imagePreview);
    if (result) {
      setMessage("변경되었습니다");
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
