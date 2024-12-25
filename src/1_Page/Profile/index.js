import React, { useEffect, useState } from "react";
import STYLE from "./style";

import Header from "./ui/Header";
import TrackingContiner from "./ui/TrackContainer";
import ModifyNameModal from "./ui/ModifyNameModal";
import ModifyModeModal from "./ui/ModifyModeModal";
import ModifyImageModal from "./ui/ModifyImageModal";

import useTrackData from "./api/useTrackingList";

import useTabs from "./model/useTabs";
import useAuthor from "./model/useAuthor";
import useModifySettingClick from "./model/useModifySettingClick";
import useModifyTrackingModal from "./model/useModifyTrackingModal";
import useModifyNameModal from "./model/useModifyNameModal";
import useSettingMode from "./model/useSettingMode";
import useConfirmModal from "./model/useConfirmModal";
import useData from "./model/useData";
import useModifyImageModal from "./model/useModifyImageModal";

import Loading from "../../2_Widget/Loading";
import Modal from "../../2_Widget/Modal";
import ModalConfirm from "../../2_Widget/ModalConfirm";

const Profile = () => {
  const name = "김재걸";

  const [pinchedData, setPinchedData] = useState(null);
  const { trackShareData, trackSaveData, trackLoading, trackError } =
    useTrackData("idx");

  const { modifyImageModal, handleImageModalClose, handleImageModalOpen } =
    useModifyImageModal();
  const { activeTab, tabIndex, handleTabClick } = useTabs();

  const { author, handleAuthorTrue, handleAuthorFalse } = useAuthor();

  const { modifyMode, handleSetMode, handleCloseMode } = useSettingMode();

  const { isModifyClick, handleModifyClickFalse, handleModalModifyTrue } =
    useModifySettingClick();

  const { modifyMapModal, handleModifyMapClose, handleModifyMapOpen } =
    useModifyTrackingModal();

  const {
    modifyNameModal,
    handleModifyNameModalClose,
    handleModifyNameModalOpen,
  } = useModifyNameModal();

  const {
    confirmModal,
    handleSetConfirmModalOpen,
    handleSetConfirmModalClose,
  } = useConfirmModal();

  const { shareData, saveData, setShareData, setSaveData, handleCancel } =
    useData(trackShareData, trackSaveData, modifyMode);

  // 로딩 애러 처리
  if (trackLoading) return <Loading />;
  if (trackError) return <Loading />;

  return (
    <>
      <STYLE.Main>
        <Header
          modifyMode={modifyMode}
          handleImageModalOpen={handleImageModalOpen}
          handleCloseMode={handleCloseMode}
          length={activeTab === "공유" ? shareData?.length : saveData?.length}
          author={author}
          type={activeTab}
          name={name}
          handleCancel={handleCancel}
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
            <STYLE.PostGrid>
              {shareData?.length === 0 ? (
                <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
              ) : (
                shareData?.map((data) => (
                  <TrackingContiner
                    data={data}
                    checkSetMode={modifyMode}
                    author={author}
                    handleModifyMapOpen={handleModifyMapOpen}
                    setPinchedData={setPinchedData}
                    shareData={shareData}
                    saveData={saveData}
                    setSaveData={setSaveData}
                    setShareData={setShareData}
                  />
                ))
              )}
            </STYLE.PostGrid>
            <STYLE.PostGrid>
              {saveData?.length === 0 ? (
                <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
              ) : (
                saveData?.map((data) => (
                  <TrackingContiner
                    data={data}
                    checkSetMode={modifyMode}
                    author={author}
                    handleModifyMapOpen={handleModifyMapOpen}
                    setPinchedData={setPinchedData}
                    shareData={shareData}
                    saveData={saveData}
                    setSaveData={setSaveData}
                    setShareData={setShareData}
                  />
                ))
              )}
            </STYLE.PostGrid>
          </STYLE.Slider>
        </STYLE.SliderWrapper>
      </STYLE.Main>
      {isModifyClick && (
        <>
          <ModifyModeModal
            handleModifyClickFalse={handleModifyClickFalse}
            handleSetMode={handleSetMode}
            sumDataLength={shareData?.length + saveData?.length}
          />
        </>
      )}
      {confirmModal && (
        <ModalConfirm
          message={
            modifyMode === "삭제"
              ? "저장 목록에서 삭제하시겠습니까?"
              : "저장하시겠습니까?"
          }
          onConfirm={() => {
            handleCloseMode();
            handleSetConfirmModalClose();
          }}
          onCancel={handleSetConfirmModalClose}
        />
      )}
      {modifyImageModal && <ModifyImageModal onClose={handleImageModalClose} />}

      {modifyNameModal && (
        <ModifyNameModal onClose={handleModifyNameModalClose} name={name} />
      )}
      {modifyMapModal && pinchedData && (
        <Modal onClose={handleModifyMapClose} trackData={pinchedData} />
      )}
    </>
  );
};

export default Profile;
