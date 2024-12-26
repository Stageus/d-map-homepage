import React, { useState } from "react";
import STYLE from "./style";
import useTab from "./model/useTab";

const UserProfile = () => {
  const name = "김재걸";

  const handleLogout = () => {
    console.log("로그아웃 실행");
  };

  const handleDeleteAccount = () => {
    console.log("회원 탈퇴 실행");
  };
  const { activeTab, handleTabWhite, handleTabDark, handleGetPresentTab } =
    useTab();

  return (
    <STYLE.Container>
      <STYLE.Header>
        <STYLE.HeaderTitle>{name}</STYLE.HeaderTitle>
      </STYLE.Header>
      <STYLE.TabContainer>
        <STYLE.TabBox>
          <STYLE.TabBackground $activeTabName={activeTab === "화이트"} />
          <STYLE.Tab
            active={handleGetPresentTab("화이트")}
            onClick={handleTabWhite}>
            이름
          </STYLE.Tab>
          <STYLE.Tab
            active={handleGetPresentTab("다크")}
            onClick={handleTabDark}>
            장소
          </STYLE.Tab>
        </STYLE.TabBox>
      </STYLE.TabContainer>
      <STYLE.ButtonContainer>
        <STYLE.ButtonBox>
          <STYLE.Button danger onClick={handleDeleteAccount}>
            회원탈퇴
          </STYLE.Button>
          <STYLE.Button onClick={handleLogout}>로그아웃</STYLE.Button>
        </STYLE.ButtonBox>
        <STYLE.ButtonBox>
          <STYLE.Footer>
            <p>Copyright 2021. 닉네임 All rights reserved.</p>
            <p>(c) 2021. 닉네임 All rights reserved.</p>
          </STYLE.Footer>
          <STYLE.BackButton>뒤로가기</STYLE.BackButton>
        </STYLE.ButtonBox>
      </STYLE.ButtonContainer>
    </STYLE.Container>
  );
};

export default UserProfile;
