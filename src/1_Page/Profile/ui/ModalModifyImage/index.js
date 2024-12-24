import React, { useEffect, useState, useRef } from "react";
import STYLE from "./style";
import Modal from "../../../../2_Widget/Modal";
import ModalConfirm from "../../../../2_Widget/ModalConfirm";
import useConfirmModal from "../../model/useConfirmModal";

const ModalModifyImage = (props) => {
  const { onClose } = props;
  const { onPhotoSelect, onEditSubmit } = props;

  const {
    confirmModal,
    handleSetConfirmModalOpen,
    handleSetConfirmModalClose,
  } = useConfirmModal();

  const closeRef = useRef(null);

  const handleConfirmModalOpen = (handleClose) => {
    handleSetConfirmModalOpen();
    closeRef.current = handleClose;
  };
  const handleConfirmModalDone = () => {
    handleSetConfirmModalClose();
    closeRef.current();
  };

  return (
    <>
      <Modal onClose={onClose} snap={[0.2]}>
        {({ handleClose }) => (
          <STYLE.Container>
            <STYLE.Title>프로필 변경</STYLE.Title>
            <STYLE.ProfileImage />
            <STYLE.PhotoButton onClick={onPhotoSelect}>
              사진선택
            </STYLE.PhotoButton>
            <STYLE.EditButton onClick={onEditSubmit}>수정하기</STYLE.EditButton>
          </STYLE.Container>
        )}
      </Modal>
      {confirmModal && (
        <ModalConfirm
          type={"one"}
          message={"변경되었습니다"}
          onClose={handleConfirmModalDone}
        />
      )}
    </>
  );
};

export default ModalModifyImage;
