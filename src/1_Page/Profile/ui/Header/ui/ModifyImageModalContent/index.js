import React from "react";
import ReactDOM from "react-dom";
import STYLE from "./style";

import ConfirmModal from "../../../../../../2_Widget/ConfirmModal";

import useFileReader from "./model/useFileReader";
import useImageModal from "./model/useImageModal";
import useModifyClick from "./model/useModifyClick";
import usePutProfileImage from "../../../../../../3_Entity/Account/usePutProfileImage";

const ModifyImageModalContent = (props) => {
  const { image, handleProfileImageChange, handleClose } = props;

  const {
    message,
    setMessage,
    confirmModal,
    confirmModalToggle,
    handleImageConfirmModalOpen,
    handleImageConfirmModalDone,
  } = useImageModal();

  const {
    uploadedImageFile,
    fileInputRef,
    imagePreviewURL,
    errorMessage,
    handleProfileImageClick,
    handleFileChange,
  } = useFileReader(image);

  const [putProfileImage] = usePutProfileImage();

  const { handleModifyClick } = useModifyClick(
    image,
    errorMessage,
    imagePreviewURL,
    uploadedImageFile,
    handleProfileImageChange,
    setMessage,
    confirmModalToggle,
    handleImageConfirmModalOpen,
    putProfileImage
  );

  return (
    <>
      <STYLE.Container>
        <STYLE.Title>프로필 변경</STYLE.Title>
        <STYLE.ProfileImage
          src={imagePreviewURL}
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

export default ModifyImageModalContent;
