import React, { useState } from "react";
import STYLE from "./style";
import Tracking from "./ui/TrackingImageList";
import { savedPosts, sharedPosts } from "./ui/TrackingImageList/api/data";
import { getCookie } from "../../4_Shared/Cookie";
import Header from "./ui/Header";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("공유");

  const [author, setAuthor] = useState(true);

  // const userIdx = getCookie("user");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderPosts = (trackingList) => {
    if (trackingList.message.length === 0) {
      return <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>;
    }
    return trackingList.message.map((elem) => <Tracking data={elem} />);
  };

  return (
    <STYLE.Main>
      <Header
        length={
          activeTab === "공유"
            ? sharedPosts.message?.length
            : savedPosts.message?.length
        }
        type={activeTab}
        name={"김재걸"}
      />
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
