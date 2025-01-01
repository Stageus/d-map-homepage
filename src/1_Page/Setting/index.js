import React, { useState } from "react";
import STYLE from "./style";
import useTab from "./model/useTab";
import ConfirmModal from "../../2_Widget/ConfirmModal";
import useConfirmModal from "./model/useConfirmModal";
import useType from "./model/useType";
import useManageUser from "./model/useManageUser";
import useChangeTheme from "./model/useChangeTheme";

const UserProfile = () => {
  const { type, message, handleSetDelete, handleSetLogout } = useType();
  const { confirmModal, handleConfirmModalOpen, handleConfirmModalClose } =
    useConfirmModal();

  const { handleTabWhite, handleTabDark, isPresentTab } = useTab();

  const {
    userData,
    handleLogin,
    handleDeleteAccount,
    handleBack,
    handleLogout,
  } = useManageUser(handleConfirmModalClose);

  const { theme } = useChangeTheme(type);

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
                    handleSetDelete();
                    handleConfirmModalOpen();
                  }}>
                  회원탈퇴
                </STYLE.Button>
                <STYLE.Button
                  onClick={() => {
                    handleSetLogout();
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
              <p>Copyright 2021. 닉네임 All rights reserved.</p>
              <p>(c) 2021. 닉네임 All rights reserved.</p>
            </STYLE.Footer>
            <STYLE.BackButton onClick={handleBack}>뒤로가기</STYLE.BackButton>
          </STYLE.ButtonBox>
        </STYLE.ButtonContainer>
      </STYLE.Container>
      {confirmModal && (
        <ConfirmModal
          msessage={message}
          onConfirm={type === "탈퇴" ? handleDeleteAccount : handleLogout}
          onCancle={handleConfirmModalClose}
        />
      )}
    </>
  );
};

export default UserProfile;
