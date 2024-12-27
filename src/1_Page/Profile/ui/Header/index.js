import React from "react";
import STYLE from "./style.js";

import useModifyImageModal from "./model/useModifyImageModal.js";
import useModifyNameModal from "./model/useModifyNameModal.js";
import useModifyMode from "./model/useModifyMode.js";
import useConfirmModal from "../../model/useConfirmModal.js";

import ModifyImageModal from "./ui/ModifyImageModal/index.js";
import ModifyNameModal from "./ui/ModifyNameModal/index.js";
import ModifyModeModal from "./ui/ModifyModeModal/index.js";
import ConfirmModal from "../../../../2_Widget/ConfirmModal";

const Header = (props) => {
  const {
    user: { name, author, profileImage },
    data: { shareData, saveData },
    setMode: { modifyMode, handleSetMode, handleCloseMode },
    handleCancel,
    activeTab,
  } = props;

  const { modifyImageModal, handleImageModalClose, handleImageModalOpen } =
    useModifyImageModal();
  const {
    modifyNameModal,
    handleModifyNameModalClose,
    handleModifyNameModalOpen,
  } = useModifyNameModal();

  const { confirmModal, handleConfirmModalOpen, handleConfirmModalClose } =
    useConfirmModal();

  const { modifyModeModal, handleModifyModeClose, handleModifyModeOpen } =
    useModifyMode();

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
                <STYLE.ProfileButton onClick={handleModifyModeOpen}>
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
              {activeTab} 게시물 :{" "}
              {activeTab === "공유" ? shareData?.length : saveData?.length}개
            </STYLE.PostCount>
          </STYLE.UserInfo>
        </STYLE.ProfileContainer>
      ) : (
        <STYLE.Container>
          <STYLE.Title>{modifyMode} 설정</STYLE.Title>
          <STYLE.ButtonWrapper>
            <STYLE.Button $primary onClick={handleConfirmModalOpen}>
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
      {modifyModeModal && (
        <>
          <ModifyModeModal
            handleModifyModeClose={handleModifyModeClose}
            handleSetMode={handleSetMode}
            sumDataLength={shareData?.length + saveData?.length}
          />
        </>
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
            handleConfirmModalClose();
          }}
          onCancel={handleConfirmModalClose}
        />
      )}
    </>
  );
};

export default Header;
