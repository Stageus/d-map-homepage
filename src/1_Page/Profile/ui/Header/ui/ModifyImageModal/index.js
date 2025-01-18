import React from "react";
import STYLE from "./style";

import Modal from "../Modal";
import ConfirmModal from "../../../../../../2_Widget/ConfirmModal";

import useFileReader from "./model/useFileReader";
import useImageModal from "./model/useImageModal";

const ModifyImageModal = (props) => {
  const { onClose } = props;
  const { image, handleImageChange } = props;

  const {
    imageFile,
    fileInputRef,
    imagePreview,
    errorMessage,
    handleProfileImageClick,
    handleFileChange,
  } = useFileReader(image);

  const {
    message,
    confirmModal,
    handleModifyClick,
    handleImageConfirmModalDone,
  } = useImageModal(
    image,
    errorMessage,
    imageFile,
    imageFile,
    handleImageChange
  );

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
