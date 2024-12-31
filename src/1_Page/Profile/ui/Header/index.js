import React from "react";
import STYLE from "./style.js";
import { useParams } from "react-router-dom";

import useModifyImageModal from "./model/useModifyImageModal.js";
import useModifyNameModal from "./model/useModifyNameModal.js";
import useModifyMode from "./model/useModifyMode.js";
import useConfirmModal from "../../model/useConfirmModal.js";

import ModifyImageModal from "./ui/ModifyImageModal/index.js";
import ModifyNameModal from "./ui/ModifyNameModal/index.js";
import ModifyModeModal from "./ui/ModifyModeModal/index.js";
import ConfirmModal from "../../../../2_Widget/ConfirmModal";
import useGetUserData from "./model/useGetUserData.js";

const Header = (props) => {
  const {
    trackData,
    getLengthSharing,
    setMode: { modifyMode, handleSetMode, handleCloseMode },
    handleCancel,
    handleDelete,
    handleModify,
    activeTab,
  } = props;

  const { userIdx } = useParams();

  const { userData, loading, error } = useGetUserData(userIdx); // 프로필 데이터

  const { modifyImageModal, handleImageModalClose, handleImageModalOpen } =
    useModifyImageModal(); // 프로필 이미지 모달
  const {
    modifyNameModal,
    handleModifyNameModalClose,
    handleModifyNameModalOpen,
  } = useModifyNameModal(); // 닉네임 수정 모달

  const { modifyModeModal, handleModifyModeClose, handleModifyModeOpen } =
    useModifyMode(); // 수정 , 삭제 뒤로가기 모달

  const { confirmModal, handleConfirmModalOpen, handleConfirmModalClose } =
    useConfirmModal(); // 확인 모달

  return (
    <>
      {!modifyMode ? (
        <STYLE.ProfileContainer>
          <STYLE.ProfileWrapper onClick={handleImageModalOpen}>
            <STYLE.ProfileImg src={userData?.image} alt="Profile" />
          </STYLE.ProfileWrapper>
          <STYLE.UserInfo>
            <STYLE.ProfileBox>
              <STYLE.UserName>{userData?.nickname}</STYLE.UserName>
              {userIdx && (
                <STYLE.ProfileButton onClick={handleModifyModeOpen}>
                  •••
                </STYLE.ProfileButton>
              )}
            </STYLE.ProfileBox>
            {userIdx && (
              <STYLE.Nickname onClick={handleModifyNameModalOpen}>
                닉네임 수정
              </STYLE.Nickname>
            )}
            <STYLE.PostCount>
              {activeTab} 게시물 :{" "}
              {activeTab === "공유" ? getLengthSharing(0) : getLengthSharing(1)}
              개
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

      {modifyImageModal && (
        <ModifyImageModal
          image={userData?.image}
          onClose={handleImageModalClose}
        />
      )}
      {modifyNameModal && (
        <ModifyNameModal
          onClose={handleModifyNameModalClose}
          name={userData?.nickname}
        />
      )}
      {modifyModeModal && (
        <>
          <ModifyModeModal
            handleModifyModeClose={handleModifyModeClose}
            handleSetMode={handleSetMode}
            sumtrackDataLength={trackData.length}
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
            modifyMode === "삭제" ? handleDelete() : handleModify();
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
