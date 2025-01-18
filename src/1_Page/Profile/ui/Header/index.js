import React from "react";
import ReactDOM from "react-dom";

import STYLE from "./style.js";

import useModifyImageModal from "../../../../4_Shared/model/useModalHandler.js";
import useModifyNameModal from "../../../../4_Shared/model/useModalHandler.js";
import useModifyMode from "../../../../4_Shared/model/useModalHandler.js";
import useConfirmModal from "../../../../4_Shared/model/useModalHandler.js";
import useManageUserInfo from "./model/useManageUserInfo.js";

import ModifyImageModal from "./ui/ModifyImageModal/index.js";
import ModifyNameModal from "./ui/ModifyNameModal/index.js";
import ModifyModeModal from "./ui/ModifyModeModal/index.js";
import ConfirmModal from "../../../../2_Widget/ConfirmModal";
import Modal from "./ui/Modal";

const Header = (props) => {
  const {
    setMode: { modifyMode, handleSetMode, handleCloseMode },
    handler: { handleSelectCancel, handleDeleteTrack, handleModifyTrack },
    tabState,
    handleTabClick,
  } = props;

  const { userInfo, handleImageChange } = useManageUserInfo();
  const trackDataLegth =
    tabState.tabIndex === 1
      ? userInfo?.share_tracking_length || 0
      : userInfo?.save_tracking_length || 0;

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
            onClick={userInfo?.isMine ? handleImageModalOpen : undefined}>
            <STYLE.ProfileImg src={userInfo?.image_url} alt="Profile" />
          </STYLE.ProfileWrapper>
          <STYLE.UserInfo>
            <STYLE.ProfileBox>
              <STYLE.UserName>{userInfo?.nickname}</STYLE.UserName>
              {userInfo?.isMine && (
                <STYLE.ProfileButton onClick={handleModifyModeOpen}>
                  •••
                </STYLE.ProfileButton>
              )}
            </STYLE.ProfileBox>
            {userInfo?.isMine && (
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
        <Modal onClose={handleImageModalClose} snap={[0.2]}>
          {({ handleClose }) => (
            <ModifyImageModal
              image={userInfo?.image_url}
              handleImageChange={handleImageChange}
              handleClose={handleClose}
            />
          )}
        </Modal>
      )}

      {modifyNameModal && (
        <Modal onClose={{ handleModifyNameModalClose }} snap={[0.2]}>
          {({ handleClose }) => (
            <ModifyNameModal
              handleClose={handleClose}
              name={userInfo?.nickname}
            />
          )}
        </Modal>
      )}

      {modifyModeModal &&
        (trackDataLegth === 0 ? (
          ReactDOM.createPortal(
            <ConfirmModal
              type="one"
              message="편집할 그림이 없습니다"
              onClose={handleModifyModeClose}
            />,
            document.body
          )
        ) : (
          <Modal onClose={handleModifyModeClose} snap={[0.2]}>
            {({ handleClose }) => (
              <ModifyModeModal
                handleSetMode={handleSetMode}
                handleClose={handleClose}
                handleModifyModeClose={handleModifyModeClose}
                trackDataLegth={trackDataLegth}
              />
            )}
          </Modal>
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
            handleConfirmModalClose();
          }}
          onCancel={handleConfirmModalClose}
        />
      )}
    </>
  );
};

export default Header;
