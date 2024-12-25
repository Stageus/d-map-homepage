import React from "react";
import STYLE from "./style.js";

import useModifyImageModal from "./model/useModifyImageModal.js";
import useModifyNameModal from "./model/useModifyNameModal.js";
import useConfirmModal from "../../model/useConfirmModal.js";

import ModifyImageModal from "../ModifyImageModal";
import ModifyNameModal from "../ModifyNameModal";
import ConfirmModal from "../../../../2_Widget/ConfirmModal";

const Header = (props) => {
  const { length, name, type, author } = props;
  const { handleModalModifyTrue } = props;
  const { handleNameModalOpen } = props;
  const { modifyMode, handleCloseMode } = props;
  const { profileImage } = props;
  const { handleCancel } = props;
  const { modifyImageModal, handleImageModalClose, handleImageModalOpen } =
    useModifyImageModal();
  const {
    modifyNameModal,
    handleModifyNameModalClose,
    handleModifyNameModalOpen,
  } = useModifyNameModal();

  const {
    confirmModal,
    handleSetConfirmModalOpen,
    handleSetConfirmModalClose,
  } = useConfirmModal();

  return (
    <>
      {!modifyMode ? (
        <STYLE.ProfileContainer>
          <STYLE.ProfileWrapper onClick={handleImageModalOpen}>
            <STYLE.ProfileImg src={profileImage} alt="Profile" />
          </STYLE.ProfileWrapper>
          <STYLE.UserInfo>
            <STYLE.ProfileBox>
              <STYLE.UserName>{name}</STYLE.UserName>
              {author && (
                <STYLE.ProfileButton onClick={handleModalModifyTrue}>
                  •••
                </STYLE.ProfileButton>
              )}
            </STYLE.ProfileBox>
            {author && (
              <STYLE.Nickname onClick={handleModifyNameModalOpen}>
                닉네임 수정
              </STYLE.Nickname>
            )}
            <STYLE.PostCount>
              {type} 게시물 : {length}개
            </STYLE.PostCount>
          </STYLE.UserInfo>
        </STYLE.ProfileContainer>
      ) : (
        <STYLE.Container>
          <STYLE.Title>{modifyMode} 설정</STYLE.Title>
          <STYLE.ButtonWrapper>
            <STYLE.Button
              $primary
              onClick={() => {
                handleSetConfirmModalOpen();
              }}>
              완료
            </STYLE.Button>
            <STYLE.Button
              onClick={() => {
                handleCloseMode();
                handleCancel();
              }}>
              취소
            </STYLE.Button>
          </STYLE.ButtonWrapper>
        </STYLE.Container>
      )}
      {modifyImageModal && <ModifyImageModal onClose={handleImageModalClose} />}

      {modifyNameModal && (
        <ModifyNameModal onClose={handleModifyNameModalClose} name={name} />
      )}

      {confirmModal && (
        <ConfirmModal
          message={
            modifyMode === "삭제"
              ? "저장 목록에서 삭제하시겠습니까?"
              : "저장하시겠습니까?"
          }
          onConfirm={() => {
            handleCloseMode();
            handleSetConfirmModalClose();
          }}
          onCancel={handleSetConfirmModalClose}
        />
      )}
    </>
  );
};

export default React.memo(Header, (prevProps, nextProps) => {
  return (
    prevProps.name === nextProps.name &&
    prevProps.length === nextProps.length &&
    prevProps.type === nextProps.type &&
    prevProps.modifyMode === nextProps.modifyMode
  );
});
