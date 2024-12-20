import React, { useEffect, useState } from "react";
import STYLE from "./style";
import TrackingContiner from "./ui/TrackContainer";
import Header from "./ui/Header";
import HeaderSetting from "./ui/HeaderSetting";
import Loading from "../../2_Widget/Loading";
import ModalModifyMode from "./ui/ModalModifyMode";
import ModalModifyMap from "../../2_Widget/ModalModifyTrackingImage";
import ModalModifyName from "./ui/ModalModifyName";
import useTrackData from "./api/useTrackingList";
import useTabs from "./model/useTabs";
import useAuthor from "./model/useAuthor";
import useModals from "./model/useModals";
import useSettingMode from "./model/useSettingMode";

const Profile = () => {
  const [pinchedData, setPinchedData] = useState(null);

  const {
    trackShareData,
    trackSaveData,
    trackLoading,
    trackError,
    fetchTrackData,
  } = useTrackData();

  const { activeTab, tabIndex, handleTabClick, handleGetLength } = useTabs();

  const { author, handleAuthorTrue, handleAuthorFalse } = useAuthor();

  const {
    isModifyClick,
    modifyMapModal,
    modifyNameModal,
    handleModalModifyTrue,
    handleModifyClickFalse,
    handleModifyMapClose,
    handleModifyMapOpen,
    handleModifyNameModalClose,
    handleModifyNameModalOpen,
  } = useModals();

  const { modifyMode, handleSetMode, handleCloseMode } = useSettingMode();

  const name = "김재걸";

  //
  useEffect(() => {
    fetchTrackData("idx");
  }, []);

  // 트래킹 리스트 렌더링
  const renderPosts = (trackingList) => {
    if (trackingList?.length === 0) {
      return <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>;
    }
    return trackingList?.map((elem) => (
      <TrackingContiner
        data={elem}
        checkSetMode={modifyMode}
        author={author}
        handleModifyMapOpen={handleModifyMapOpen}
        setPinchedData={setPinchedData}
      />
    ));
  };

  // 로딩 애러 처리
  if (trackLoading) return <Loading />;
  if (trackError) return <Loading />;

  return (
    <>
      <STYLE.Main>
        {!modifyMode ? (
          <Header
            length={handleGetLength(activeTab, trackShareData, trackSaveData)}
            author={author}
            type={activeTab}
            name={name}
            handleModalModifyTrue={handleModalModifyTrue}
            handleNameModalOpen={handleModifyNameModalOpen}
          />
        ) : (
          <HeaderSetting
            modifyMode={modifyMode}
            handleCloseMode={handleCloseMode}
          />
        )}
        <STYLE.TabMenu>
          {author ? (
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
          ) : (
            <STYLE.TabNone>게시물</STYLE.TabNone>
          )}
        </STYLE.TabMenu>
        <STYLE.SliderWrapper tabIndex={tabIndex}>
          <STYLE.Slider tabIndex={tabIndex}>
            <STYLE.PostGrid>{renderPosts(trackShareData)}</STYLE.PostGrid>
            <STYLE.PostGrid>{renderPosts(trackSaveData)}</STYLE.PostGrid>
          </STYLE.Slider>
        </STYLE.SliderWrapper>
      </STYLE.Main>
      {isModifyClick && (
        <ModalModifyMode
          activeTab={activeTab}
          handleModifyClickFalse={handleModifyClickFalse}
          handleSetMode={handleSetMode}
          handleGetLength={handleGetLength}
        />
      )}
      {modifyMapModal && pinchedData && (
        <ModalModifyMap onClose={handleModifyMapClose} data={pinchedData} />
      )}
      {modifyNameModal && (
        <ModalModifyName onClose={handleModifyNameModalClose} name={name} />
      )}
    </>
  );
};

export default Profile;
