import React from "react";
import STYLE from "./style";
import Tracking from "./ui/TrackingImageList";
import Header from "./ui/Header";
import OneBtnModal from "../../2_Widget/OneBtnModal";
import BottomSheetShare from "./ui/BottomSheetShare";
import SettingHeader from "./ui/SettingHeader";
import Loading from "../../2_Widget/Loading";
import useProfile from "./model/useProfile";

const Profile = () => {
  const {
    activeTab,
    tabIndex,
    checkSetMode,
    isModal,
    author,
    trackShareData,
    trackSaveData,
    trackLoading,
    trackError,
    handleTabClick,
    handleGetLength,
    handleModalClose,
    handleModalMode,
    handleCloseMode,
  } = useProfile();

  const renderPosts = (trackingList) => {
    if (trackingList?.length === 0) {
      return <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>;
    }
    return trackingList?.map((elem) => (
      <Tracking data={elem} checkSetMode={checkSetMode} />
    ));
  };

  if (trackLoading) return <Loading />;
  if (trackError) return <Loading />;

  return (
    <>
      <STYLE.Main>
        {!checkSetMode ? (
          <Header
            length={handleGetLength(activeTab)}
            author={author}
            type={activeTab}
            name={"김재걸"}
            setIsModalOpen={handleModalClose}
          />
        ) : (
          <SettingHeader
            checkSetMode={checkSetMode}
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
      {isModal &&
        (handleGetLength(activeTab) === 0 ? (
          <OneBtnModal
            message="편집할 그림이 없습니다"
            onClose={handleModalClose}
          />
        ) : (
          <BottomSheetShare
            onClose={handleModalClose}
            onDelete={() => {
              handleModalMode("삭제");
              handleModalClose();
            }}
            onShare={() => {
              handleModalMode("공유");
              handleModalClose();
            }}
          />
        ))}
    </>
  );
};

export default Profile;
