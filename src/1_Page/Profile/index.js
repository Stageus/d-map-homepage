import React, { useEffect, useState } from "react";
import STYLE from "./style";

import Header from "./ui/Header";
import ModalModifyMode from "./ui/ModalModifyMode";
import TrackingContiner from "./ui/TrackContainer";
import ModalModifyName from "./ui/ModalModifyName";

import useTrackData from "./api/useTrackingList";

import useTabs from "./model/useTabs";
import useAuthor from "./model/useAuthor";
import useModifySettingClick from "./model/useModifySettingClick";
import useModifyTrackingModal from "./model/useModifyTrackingModal";
import useModifyNameModal from "./model/useModifyNameModal";
import useSettingMode from "./model/useSettingMode";
import useConfirmModal from "./model/useConfirmModal";

import Loading from "../../2_Widget/Loading";
import Modal from "../../2_Widget/Modal";
import ModalConfirm from "../../2_Widget/ModalConfirm";

const Profile = () => {
  const [pinchedData, setPinchedData] = useState(null);
  const [shareData, setSharekData] = useState(null);
  const [saveData, setSaveData] = useState(null);

  const { trackShareData, trackSaveData, trackLoading, trackError } =
    useTrackData("idx");

  useEffect(() => {
    if (!trackShareData && !trackSaveData) return;
    setSharekData(trackShareData);
    setSaveData(trackSaveData);
  }, [trackShareData, trackSaveData]);

  const { activeTab, tabIndex, handleTabClick } = useTabs();

  const handleGetLength = (tab, shareData, saveData) => {
    if (!shareData || !saveData) return "로딩중";
    return tab === "공유" ? shareData?.length : saveData?.length;
  };

  const { author, handleAuthorTrue, handleAuthorFalse } = useAuthor();

  const { modifyMode, handleSetMode, handleCloseMode } = useSettingMode();

  const name = "김재걸";
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

  // 로딩 애러 처리
  if (trackLoading) return <Loading />;
  if (trackError) return <Loading />;

  return (
    <>
      <STYLE.Main>
        <Header
          modifyMode={modifyMode}
          handleCloseMode={handleCloseMode}
          length={handleGetLength(activeTab, shareData, saveData)}
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
            <STYLE.PostGrid>
              {shareData.map((data) => (
                <TrackingContiner
                  key={data.id} // 고유한 key 값 필요
                  data={data}
                  checkSetMode={modifyMode}
                  author={author}
                  handleModifyMapOpen={handleModifyMapOpen}
                  setPinchedData={setPinchedData}
                  shareData={shareData}
                  saveData={saveData}
                  setSaveData={setSaveData}
                  setSharekData={setSharekData}
                />
              ))}
            </STYLE.PostGrid>
            <STYLE.PostGrid>
              {saveData.map((data) => (
                <TrackingContiner
                  key={data.id} // 고유한 key 값 필요
                  data={data}
                  checkSetMode={modifyMode}
                  author={author}
                  handleModifyMapOpen={handleModifyMapOpen}
                  setPinchedData={setPinchedData}
                  shareData={shareData}
                  saveData={saveData}
                  setSaveData={setSaveData}
                  setSharekData={setSharekData}
                />
              ))}
            </STYLE.PostGrid>
          </STYLE.Slider>
        </STYLE.SliderWrapper>
      </STYLE.Main>
      {isModifyClick && (
        <>
          <ModalModifyMode
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
              ? "저장하시겠습니까?"
              : "저장 목록에서 삭제하시겠습니까?"
          }
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
