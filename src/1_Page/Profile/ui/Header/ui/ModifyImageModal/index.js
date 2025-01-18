import React from "react";
import ReactDOM from "react-dom";
import STYLE from "./style";

import ConfirmModal from "../../../../../../2_Widget/ConfirmModal";

import useFileReader from "./model/useFileReader";
import useImageModal from "./model/useImageModal";

const ModifyImageModal = (props) => {
  const { image, handleImageChange, handleClose } = props;

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
    imagePreview,
    imageFile,
    handleImageChange
  );

  return (
    <>
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

      {/* ConfirmModal을 Portal로 렌더링 */}
      {confirmModal &&
        ReactDOM.createPortal(
          <ConfirmModal
            type={"one"}
            message={message}
            onClose={handleImageConfirmModalDone}
          />,
          document.body
        )}
    </>
  );
};

export default ModifyImageModal;
