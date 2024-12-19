import React from "react";
import STYLE from "./style";
import Tracking from "./ui/TrackingImageList";
import Header from "./ui/Header";
import OneBtnModal from "../../2_Widget/OneBtnModal";
import BottomSheetShare from "./ui/BottomSheetShare";
import SettingHeader from "./ui/SettingHeader";
import Loading from "../../2_Widget/Loading";
import useProfileLogic from "./useProfileLogic";

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
  } = useProfileLogic();

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
                onClick={() =>