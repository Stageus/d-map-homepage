import React from "react";
import STYLE from "./style";
import useTab from "./model/useTab";
import ConfirmModal from "../../2_Widget/ConfirmModal";
import useConfirmModal from "../../4_Shared/model/useModalHandler";
import useActionModalMessageSet from "./model/useActionModalMessageSet";
import useManageUser from "./model/useManageUser";
import useChangeTheme from "./model/useChangeTheme";
import ACTION_MESSAGES from "./constant/actionMessagesType";

const UserProfile = () => {
  const { selectedAction, handleMessageSetDelete, handleMessageSetLogout } =
    useActionModalMessageSet();

  const [confirmModal, handleConfirmModalOpen, handleConfirmModalClose] =
    useConfirmModal();

  const { activeTab, handleTabWhite, handleTabDark, isPresentTab } = useTab();

  const {
    userData,
    handleLogin,
    handleDeleteAccount,
    handleBack,
    handleLogout,
  } = useManageUser(handleConfirmModalClose);

  const { theme } = useChangeTheme(activeTab);

  return (
    <>
      <STYLE.Container>
        <STYLE.Header>
          <STYLE.HeaderTitle>
            {userData ? userData.nickname : "로그인이 필요합니다"}
          </STYLE.HeaderTitle>
        </STYLE.Header>
        <STYLE.TabContainer>
          <STYLE.TabBox>
            <STYLE.Tab
              $active={isPresentTab("화이트")}
              onClick={handleTabWhite}>
              화이트
            </STYLE.Tab>
            <STYLE.Tab $active={isPresentTab("다크")} onClick={handleTabDark}>
              다크
            </STYLE.Tab>
            <STYLE.TabBackground $activeTabName={isPresentTab("화이트")} />
          </STYLE.TabBox>
        </STYLE.TabContainer>
        <STYLE.ButtonContainer>
          <STYLE.ButtonBox>
            {userData ? (
              <>
                <STYLE.Button
                  danger
                  onClick={() => {
                    handleMessageSetDelete();
                    handleConfirmModalOpen();
                  }}>
                  회원탈퇴
                </STYLE.Button>
                <STYLE.Button
                  onClick={() => {
                    handleMessageSetLogout();
                    handleConfirmModalOpen();
                  }}>
                  로그아웃
                </STYLE.Button>
              </>
            ) : (
              <STYLE.Button
                onClick={() => {
                  handleLogin();
                }}>
                로그인 하기
              </STYLE.Button>
            )}
          </STYLE.ButtonBox>
          <STYLE.ButtonBox>
            <STYLE.Footer>
              <p>
                Copyright © 2025. Stageus Team.
                <br />
                Designed for Android and iOS.
                <br />
                Published on Google Play and App Store.
                <br />
                All rights reserved.
              </p>
            </STYLE.Footer>
            <STYLE.BackButton onClick={handleBack}>뒤로가기</STYLE.BackButton>
          </STYLE.ButtonBox>
        </STYLE.ButtonContainer>
      </STYLE.Container>
      {confirmModal && (
        <ConfirmModal
          message={`정말로 ${selectedAction} 하시겠습니까?`}
          onConfirm={
            selectedAction === ACTION_MESSAGES.delete
              ? handleDeleteAccount
              : handleLogout
          }
          onCancel={handleConfirmModalClose}
        />
      )}
    </>
  );
};

export default UserProfile;
