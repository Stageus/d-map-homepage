import React, { useEffect, useState } from "react";
import STYLE from "./style";
import TrackingContiner from "./ui/TrackContainer";
import Header from "./ui/Header";
import Loading from "../../2_Widget/Loading";
import ModalModifyMode from "./ui/ModalModifyMode";
import Modal from "../../2_Widget/Modal";
import ModalModifyName from "./ui/ModalModifyName";
import useTrackData from "./api/useTrackingList";
import useTabs from "./model/useTabs";
import useAuthor from "./model/useAuthor";
import useModifyClick from "./model/useModifyClick";
import useModifyTrackingModal from "./model/useModifyTracking";
import useModifyNameModal from "./model/useModifyNameModal";
import useSettingMode from "./model/useSettingMode";
import useConfirmModal from "./model/useConfirmModal";
import ModalConfirm from "../../2_Widget/ModalConfirm";

const Profile = () => {
  const [pinchedData, setPinchedData] = useState(null);

  const { trackShareData, trackSaveData, trackLoading, trackError } =
    useTrackData("idx");

  const { activeTab, tabIndex, handleTabClick } = useTabs();

  const handleGetLength = (tab) => {
    if (!trackShareData || !trackSaveData) return "로딩중";
    return tab === "공유" ? trackShareData?.length : trackSaveData?.length;
  };

  const sumDataLength = trackShareData.length + trackSaveData.length;

  const { author, handleAuthorTrue, handleAuthorFalse } = useAuthor();

  const { modifyMode, handleSetMode, handleCloseMode } = useSettingMode();

  const name = "김재걸";
  const { isModifyClick, handleModifyClickFalse, handleModalModifyTrue } =
    useModifyClick();

  const { modifyMapModal, handleModifyMapClose, handleModifyMapOpen } =
    useModifyTrackingModal();

  const {
    modifyNameModal,
    handleModifyNameModalClose,
    handleModifyNameModalOpen,
  } = useModifyNameModal();

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

  const {
    confirmModal,
    handleSetConfirmModalOpen,
    handleSetConfirmModalClose,
  } = useConfirmModal();

  const getModalText = (modifyMode) => {
    if (modifyMode === "삭제") return `저장 목록에서 삭제하시겠습니까?`;
    return `저장하시겠습니까?`;
  };

  // 로딩 애러 처리
  if (trackLoading) return <Loading />;
  if (trackError) return <Loading />;

  return (
    <>
      <STYLE.Main>
        <Header
          modifyMode={modifyMode}
          handleCloseMode={handleCloseMode}
          length={handleGetLength(activeTab, trackShareData, trackSaveData)}
          author={author}
          type={activeTab}
          name={name}
          handleSetConfirmModalOpen={handleSetConfirmModalOpen}
          handleModalModifyTrue={handleModalModifyTrue}
          handleNameModalOpen={handleModifyNameModalOpen}
        />
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
        <>
          <ModalModifyMode
            handleModifyClickFalse={handleModifyClickFalse}
            handleSetMode={handleSetMode}
            sumDataLength={sumDataLength}
          />
        </>
      )}
      {confirmModal && (
        <ModalConfirm
          message={getModalText(modifyMode)}
          onCancel={handleSetConfirmModalClose}
        />
      )}
      {modifyNameModal && (
        <ModalModifyName onClose={handleModifyNameModalClose} name={name} />
      )}
      {modifyMapModal && pinchedData && (
        <Modal onClose={handleModifyMapClose} trackData={pinchedData} />
      )}
    </>
  );
};

export default Profile;
