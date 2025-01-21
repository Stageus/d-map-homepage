import React, { useState } from "react";
import STYLE from "./style";

import ConfirmTwoBtnModal from "../../2_Widget/ConfirmModal";
import ErrorModal from "../../2_Widget/ConfirmModal";
import useModalHandler from "../../4_Shared/model/useModalHandler";

import useTab from "./model/useTab";
import useActionModalMessageSet from "./model/useActionModalMessageSet";
import useManageUser from "./model/useManageUser";
import useChangeTheme from "./model/useChangeTheme";
import useErrorModalHandler from "./model/useErrorModalHandler";

import ACTION_MESSAGES from "./constant/actionMessagesType";
import TABS from "./constant/tabs";

const UserProfile = () => {
  const { selectedAction, handleMessageSetDelete, handleMessageSetLogout } =
    useActionModalMessageSet();

  const [confirmTwoBtnModal, confimTwoBtnToggle] = useModalHandler();

  const { errorModal, errorMessage, errorModalOpen, errorModalToggle } =
    useErrorModalHandler();

  const { activeTab, handleTabWhite, handleTabDark, isPresentTab } = useTab();

  const {
    userInfo,
    handleLogin,
    handleDeleteAccount,
    handleBack,
    handleLogout,
  } = useManageUser(confimTwoBtnToggle, errorModalOpen);

  useChangeTheme(activeTab);

  return (
    <>
      <STYLE.Container>
        <STYLE.Header>
          <STYLE.HeaderTitle>
            {userInfo ? userInfo.nickname : "로그인이 필요합니다"}
          </STYLE.HeaderTitle>
        </STYLE.Header>
        <STYLE.TabContainer>
          <STYLE.TabBox>
            <STYLE.Tab
              $active={isPresentTab(TABS.WHITE)}
              onClick={handleTabWhite}>
              화이트
            </STYLE.Tab>
            <STYLE.Tab
              $active={isPresentTab(TABS.DARK)}
              onClick={handleTabDark}>
              다크
            </STYLE.Tab>
            <STYLE.TabBackground $activeTabName={isPresentTab(TABS.WHITE)} />
          </STYLE.TabBox>
        </STYLE.TabContainer>
        <STYLE.ButtonContainer>
          <STYLE.ButtonBox>
            {userInfo ? (
              <>
                <STYLE.Button
                  danger
                  onClick={() => {
                    handleMessageSetDelete();
                    confimTwoBtnToggle();
                  }}>
                  회원탈퇴
                </STYLE.Button>
                <STYLE.Button
                  onClick={() => {
                    handleMessageSetLogout();
                    confimTwoBtnToggle();
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
      {confirmTwoBtnModal && (
        <ConfirmTwoBtnModal
          message={`정말로 ${selectedAction} 하시겠습니까?`}
          onConfirm={
            selectedAction === ACTION_MESSAGES.delete
              ? handleDeleteAccount
              : handleLogout
          }
          onCancel={confimTwoBtnToggle}
        />
      )}
      {errorModal && (
        <ErrorModal
          message={errorMessage}
          type="one"
          onClose={errorModalToggle}
        />
      )}
    </>
  );
};

export default UserProfile;
