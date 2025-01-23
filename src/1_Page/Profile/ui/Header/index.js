import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import STYLE from "./style.js";
import empty_profie_icon from "./assets/empty_profile_icon.svg";

import useManageUserInfo from "./model/useManageUserInfo.js";

import useModifyImageModal from "../../../../4_Shared/model/useModalHandler.js";
import useModifyNameModal from "../../../../4_Shared/model/useModalHandler.js";
import useModifyMode from "../../../../4_Shared/model/useModalHandler.js";
import useModalHandler from "../../../../4_Shared/model/useModalHandler.js";

import ModalBase from "./ui/ModalBase";
import ModifyImageModalContent from "./ui/ModifyImageModalContent";
import ModifyNameModalContent from "./ui/ModifyNameModalContent";
import ModifyModeModalContent from "./ui/ModifyModeModalContent";
import ConfirmModal from "../../../../2_Widget/ConfirmModal";

const Header = (props) => {
  const {
    setMode: { modifyMode, handleSetMode, handleCloseMode },
    handler: { handleSelectCancel, handleDeleteTrack, handleModifyTrack },
    tabState,
    userInfoData,
    handleTabClick,
  } = props;

  const { userInfo, handleProfileImageChange, handleChangeNickName } =
    useManageUserInfo(userInfoData);

  const trackDataLength = userInfo?.share_tracking_length
    ? tabState.tabIndex === 0
      ? userInfo?.share_tracking_length
      : userInfo?.total_tracking_length - userInfo?.share_tracking_length
    : 0;

  const [modifyImageModal, modifyImageModalToggle] = useModifyImageModal(); // 프로필 이미지 모달
  const [modifyNameModal, modifyNameModalToggle] = useModifyNameModal(); // 닉네임 수정 모달
  const [modifyModeModal, modifyModeModalToggle] = useModifyMode(); // 수정 , 삭제 뒤로가기 모달
  const [confirmModal, confirmModalToggle] = useModalHandler(); // 확인 모달

  return (
    <>
      {!modifyMode ? (
        <STYLE.ProfileContainer>
          <STYLE.ProfileWrapper
            onClick={userInfo?.isMine ? modifyImageModalToggle : undefined}>
            <STYLE.ProfileImg
              src={
                userInfo?.image_url ? userInfo?.image_url : empty_profie_icon
              }
            />
          </STYLE.ProfileWrapper>
          <STYLE.UserInfo>
            <STYLE.ProfileBox>
              <STYLE.UserName>{userInfo?.nickname}</STYLE.UserName>
              {userInfo?.isMine && (
                <STYLE.ProfileButton onClick={modifyModeModalToggle}>
                  •••
                </STYLE.ProfileButton>
              )}
            </STYLE.ProfileBox>
            {userInfo?.isMine && (
              <STYLE.Nickname onClick={modifyNameModalToggle}>
                닉네임 수정
              </STYLE.Nickname>
            )}
            <STYLE.PostCount>
              {tabState?.activeTabStr} 게시물 : {trackDataLength}개
            </STYLE.PostCount>
          </STYLE.UserInfo>
        </STYLE.ProfileContainer>
      ) : (
        <STYLE.Container>
          <STYLE.Title>{modifyMode} 설정</STYLE.Title>
          <STYLE.ButtonWrapper>
            <STYLE.Button $primary onClick={confirmModalToggle}>
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
        {userInfo?.isMine ? (
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
        <ModalBase onClose={modifyImageModalToggle} snap={[0.2]}>
          {({ handleClose }) => (
            <ModifyImageModalContent
              image={userInfo?.image_url}
              handleProfileImageChange={handleProfileImageChange}
              handleClose={handleClose}
            />
          )}
        </ModalBase>
      )}

      {modifyNameModal && (
        <ModalBase onClose={modifyNameModalToggle} snap={[0.2]}>
          {({ handleClose }) => (
            <ModifyNameModalContent
              handleChangeNickName={handleChangeNickName}
              handleClose={handleClose}
              name={userInfo?.nickname}
            />
          )}
        </ModalBase>
      )}

      {modifyModeModal &&
        (trackDataLength === 0 ? (
          ReactDOM.createPortal(
            <ConfirmModal
              type="one"
              message="편집할 그림이 없습니다"
              onClose={modifyModeModalToggle}
            />,
            document.body
          )
        ) : (
          <ModalBase onClose={modifyModeModalToggle} snap={[0.2]}>
            {({ handleClose }) => (
              <ModifyModeModalContent
                handleSetMode={handleSetMode}
                handleClose={handleClose}
                handleModifyModeClose={modifyModeModalToggle}
                trackDataLength={trackDataLength}
              />
            )}
          </ModalBase>
        ))}

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
            confirmModalToggle();
          }}
          onCancel={confirmModalToggle}
        />
      )}
    </>
  );
};

export default Header;
