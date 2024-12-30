import React, { useEffect, useRef, useState } from "react";
import STYLE from "./style";

import Modal from "../../../../../../2_Widget/Modal";
import ConfirmModal from "../../../../../../2_Widget/ConfirmModal";

import useFileReader from "./model/useFileReader";
import useConfirmModal from "../../../../model/useConfirmModal";
import useModifyImage from "./api/useModifyImage";

const ModifyImageModal = (props) => {
  const { onClose } = props;
  const { image } = props;

  const [message, setMessage] = useState("");

  const { confirmModal, handleConfirmModalOpen, handleConfirmModalClose } =
    useConfirmModal();

  const { modify, loading, error } = useModifyImage();

  const closeRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    imageRef.current = image;
  }, [image]);

  const handleImageConfirmModalOpen = (handleClose) => {
    handleConfirmModalOpen();
    closeRef.current = handleClose;
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

  const handleImageConfirmModalDone = () => {
    handleConfirmModalClose();
    if (closeRef.current) closeRef.current();
  };
  const {
    fileInputRef,
    imagePreview,
    errorMessage,
    handleProfileImageClick,
    handleFileChange,
  } = useFileReader(image);

  return (
    <>
      <Modal onClose={onClose} snap={[0.2]}>
        {({ handleClose }) => (
          <STYLE.Container>
            <STYLE.Title>프로필 변경</STYLE.Title>
            <STYLE.ProfileImage
              src={imagePreview}
              alt="프로필 이미지"
              onClick={handleProfileImageClick}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <STYLE.PhotoButton onClick={handleProfileImageClick}>
              사진선택
            </STYLE.PhotoButton>
            <STYLE.EditButton
              onClick={() => {
                handleModifyClick(handleClose);
              }}>
              수정하기
            </STYLE.EditButton>
          </STYLE.Container>
        )}
      </Modal>
      {confirmModal && (
        <ConfirmModal
          type={"one"}
          message={message}
          onClose={handleImageConfirmModalDone}
        />
      )}
    </>
  );
};

export default ModifyImageModal;
