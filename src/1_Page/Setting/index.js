import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import STYLE from "./style";
import ACTION_MESSAGES from "./constant/actionMessagesType";
import TABS from "./constant/tabs";

import useThemeTab from "./model/useThemeTab";
import useLogout from "./model/useLogout";

import ConfirmTwoBtnModal from "../../2_Widget/ConfirmModal";
import useDeleteAccountUser from "../../3_Entity/Account/useDeleteAccountUser";
import useAuthenticator from "../../4_Shared/lib/useAuthenticator";
import useModalHandler from "../../4_Shared/model/useModalHandler";

const Setting = () => {
  const navigate = useNavigate();
  const [confirmTwoBtnModal, confimTwoBtnToggle] = useModalHandler();
  const [modalMessage, setModalMessage] = useState(null);
  const [handleTabWhite, handleTabDark, isPresentTab] = useThemeTab();
  const [deleteAccountUser] = useDeleteAccountUser();
  const [logout] = useLogout();
  const [isLogin] = useAuthenticator();

  return (
    <>
      <STYLE.Container>
        <STYLE.Header>
          <STYLE.HeaderTitle>
            {isLogin ? "설정 페이지" : "로그인이 필요합니다"}
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
            {isLogin ? (
              <>
                <STYLE.Button
                  danger
                  onClick={() => {
                    setModalMessage(ACTION_MESSAGES.delete);
                    confimTwoBtnToggle();
                  }}>
                  회원탈퇴
                </STYLE.Button>
                <STYLE.Button
                  onClick={() => {
                    setModalMessage(ACTION_MESSAGES.logout);
                    confimTwoBtnToggle();
                  }}>
                  로그아웃
                </STYLE.Button>
              </>
            ) : (
              <STYLE.Button
                onClick={() => {
                  navigate("/login");
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
          </STYLE.ButtonBox>
        </STYLE.ButtonContainer>
      </STYLE.Container>

      {confirmTwoBtnModal && (
        <ConfirmTwoBtnModal
          message={`정말로 ${modalMessage} 하시겠습니까?`}
          onConfirm={
            modalMessage === ACTION_MESSAGES.delete ? deleteAccountUser : logout
          }
          onCancel={confimTwoBtnToggle}
        />
      )}
    </>
  );
};

export default Setting;
