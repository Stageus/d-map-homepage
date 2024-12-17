import React, { useEffect, useState } from "react";
import STYLE from "./style";
import Tracking from "./ui/TrackingImageList";
import { savedPosts, sharedPosts } from "./ui/TrackingImageList/api/data";
import { getCookie } from "../../4_Shared/Cookie";
import Header from "./ui/Header";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("공유");
  const [tabIndex, setTabIndex] = useState(0); // 애니메이션을 위한 인덱스
  const [settingMode, setSettingMode] = useState(false);

  const [author, setAuthor] = useState(true);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setTabIndex(tab === "공유" ? 0 : 1); // "공유"는 0, "저장"은 1
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
        author={author}
        type={activeTab}
        name={"김재걸"}
        setSettingMode={setSettingMode}
      />
      <STYLE.TabMenu>
        {author && (
          <>
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
          </>
        )}
      </STYLE.TabMenu>
      <STYLE.SliderWrapper tabIndex={tabIndex}>
        <STYLE.Slider tabIndex={tabIndex}>
          <STYLE.PostGrid>{renderPosts(sharedPosts)}</STYLE.PostGrid>
          <STYLE.PostGrid>{renderPosts(savedPosts)}</STYLE.PostGrid>
        </STYLE.Slider>
      </STYLE.SliderWrapper>
    </STYLE.Main>
  );
};

export default Profile;
