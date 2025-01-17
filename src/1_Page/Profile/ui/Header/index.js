import React, { useEffect } from "react";
import STYLE from "./style.js";
import { useParams } from "react-router-dom";

import useModifyImageModal from "../../../../4_Shared/model/useModalHandler.js";
import useModifyNameModal from "../../../../4_Shared/model/useModalHandler.js";
import useModifyMode from "../../../../4_Shared/model/useModalHandler.js";
import useConfirmModal from "../../../../4_Shared/model/useModalHandler.js";

import ModifyImageModal from "./ui/ModifyImageModal/index.js";
import ModifyNameModal from "./ui/ModifyNameModal/index.js";
import ModifyModeModal from "./ui/ModifyModeModal/index.js";
import ConfirmModal from "../../../../2_Widget/ConfirmModal";
import useGetUserData from "../../../../3_Entity/Profile/useGetUserData.js";

const Header = (props) => {
  const {
    trackData,
    trackDataLegth,
    setMode: { modifyMode, handleSetMode, handleCloseMode },
    handler: { handleSelectCancel, handleDeleteTrack, handleModifyTrack },
    tabState,
    handleTabClick,
  } = props;

  const isMine = true;

  const { userIdx } = useParams();

  const { userData, loading, error } = useGetUserData(userIdx); // 프로필 데이터

  const [modifyImageModal, handleImageModalOpen, handleImageModalClose] =
    useModifyImageModal(); // 프로필 이미지 모달
  const [
    modifyNameModal,
    handleModifyNameModalOpen,
    handleModifyNameModalClose,
  ] = useModifyNameModal(); // 닉네임 수정 모달

  const [modifyModeModal, handleModifyModeOpen, handleModifyModeClose] =
    useModifyMode(); // 수정 , 삭제 뒤로가기 모달

  const [confirmModal, handleConfirmModalOpen, handleConfirmModalClose] =
    useConfirmModal(); // 확인 모달

  return (
    <>
      {!modifyMode ? (
        <STYLE.ProfileContainer>
          <STYLE.ProfileWrapper
            onClick={isMine ? handleImageModalOpen : undefined}>
            <STYLE.ProfileImg src={userData?.image} alt="Profile" />
          </STYLE.ProfileWrapper>
          <STYLE.UserInfo>
            <STYLE.ProfileBox>
              <STYLE.UserName>{userData?.nickname}</STYLE.UserName>
              {isMine && (
                <STYLE.ProfileButton onClick={handleModifyModeOpen}>
                  •••
                </STYLE.ProfileButton>
              )}
            </STYLE.ProfileBox>
            {isMine && (
              <STYLE.Nickname onClick={handleModifyNameModalOpen}>
                닉네임 수정
              </STYLE.Nickname>
            )}
            <STYLE.PostCount>
              {tabState?.activeTabStr} 게시물 : {trackDataLegth}개
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
                handleSelectCancel();
              }}>
              취소
            </STYLE.Button>
          </STYLE.ButtonWrapper>
        </STYLE.Container>
      )}

      <STYLE.TabMenu>
        {isMine ? (
          <>
            <STYLE.Tab
              $active={tabState?.activeTabStr === "공유"}
              onClick={() => handleTabClick("공유")}>
              공유
            </STYLE.Tab>
            <STYLE.Tab
              $active={tabState?.activeTabStr === "저장"}
              onClick={() => handleTabClick("저장")}>
              저장
            </STYLE.Tab>
          </>
        ) : (
          <STYLE.TabNone>게시물</STYLE.TabNone>
        )}
      </STYLE.TabMenu>

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
            modifyMode === "삭제" ? handleDeleteTrack() : handleModifyTrack();
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
