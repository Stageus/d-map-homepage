import React, { useState } from "react";
import STYLE from "./style";
import ProfileImage from "./ui/ProfileImage";
import Tracking from "./ui/TrackingImageList";
import { savedPosts, sharedPosts } from "./ui/TrackingImageList/api/data";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("공유");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderPosts = (trackingList) => {
    if (trackingList.length === 0) {
      return <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>;
    }
    return trackingList.message.map((elem) => (
      <Tracking data={elem} alt="post" />
    ));
  };

  return (
    <STYLE.Main>
      <STYLE.ProfileContainer>
        <ProfileImage />
        <STYLE.UserInfo>
          <STYLE.UserName>김재걸</STYLE.UserName>
          <STYLE.Nickname>닉네임 수정</STYLE.Nickname>
          <STYLE.PostCount>
            공유 게시물 : {sharedPosts.message.length}개
          </STYLE.PostCount>
        </STYLE.UserInfo>
      </STYLE.ProfileContainer>
      <STYLE.TabMenu>
        <STYLE.Tab
          active={activeTab === "공유"}
          onClick={() => handleTabClick("공유")}>
          공유
        </STYLE.Tab>
        <STYLE.Tab
          active={activeTab === "저장"}
          onClick={() => handleTabClick("저장")}>
          저장
        </STYLE.Tab>
      </STYLE.TabMenu>
      <STYLE.PostGrid>
        {activeTab === "공유"
          ? renderPosts(sharedPosts)
          : renderPosts(savedPosts)}
      </STYLE.PostGrid>
    </STYLE.Main>
  );
};

export default Profile;
