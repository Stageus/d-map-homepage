import React, { useRef } from "react";
import STYLE from "./style";

import Modal from "../../../../../../2_Widget/Modal";
import ConfirmModal from "../../../../../../2_Widget/ConfirmModal";

import useFileReader from "./model/useFileReader";
import useConfirmModal from "../../../../model/useConfirmModal";

const ModifyImageModal = (props) => {
  const { onClose } = props;

  const { confirmModal, handleConfirmModalOpen, handleConfirmModalClose } =
    useConfirmModal();

  const closeRef = useRef(null);

  const handleImageConfirmModalOpen = (handleClose) => {
    handleConfirmModalOpen();
    closeRef.current = handleClose;
  };

  const handleImageConfirmModalDone = () => {
    handleConfirmModalClose();
    closeRef.current();
  };
  const {
    fileInputRef,
    imagePreview,
    handleProfileImageClick,
    handleFileChange,
  } = useFileReader();

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
                handleImageConfirmModalOpen(handleClose);
              }}>
              수정하기
            </STYLE.EditButton>
          </STYLE.Container>
        )}
      </Modal>
      {confirmModal && (
        <ConfirmModal
          type={"one"}
          message={"변경되었습니다"}
          onClose={handleImageConfirmModalDone}
        />
      )}
    </>
  );
};

export default ModifyImageModal;
