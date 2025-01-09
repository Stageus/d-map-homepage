import { useState, useRef, useEffect } from "react";
import useConfirmModal from "../../../../../../../4_Shared/model/useModalHandler";
import useModifyImage from "../../../../../../../3_Entity/Profile/useModifyImage";

const useImageModal = (image, errorMessage, imagePreview) => {
  const [confirmModal, openConfirmModal, closeConfirmModal] = useConfirmModal();
  const { modify, loading, error } = useModifyImage();

  const [message, setMessage] = useState("");
  const currentImageRef = useRef(image);
  const closeCallbackRef = useRef(null);

  useEffect(() => {
    currentImageRef.current = image;
  }, [image]);

  const openImageModalWithCallback = (onClose) => {
    openConfirmModal();
    closeCallbackRef.current = onClose;
  };

  const closeAndExecuteCallback = () => {
    closeConfirmModal();
    if (closeCallbackRef.current) closeCallbackRef.current();
  };

  const validateImageChange = () => {
    if (errorMessage) return errorMessage;
    if (currentImageRef.current === imagePreview) return "사진을 변경하세요";
    return null;
  };

  const handleModifyClick = async (onClose) => {
    const validationError = validateImageChange();
    if (validationError) {
      setMessage(validationError);
      openConfirmModal();
      return;
    }

    const result = await modify(imagePreview);
    if (result) {
      setMessage("변경되었습니다");
      openImageModalWithCallback(onClose);
      return;
    }

    setMessage(result || "변경에 실패했습니다");
    openConfirmModal();
  };

  return {
    message,
    confirmModal,
    handleModifyClick,
    closeAndExecuteCallback,
  };
};

export default useImageModal;
