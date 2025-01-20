import STYLE from "./style";

import Header from "./ui/Header";
import TrackingImageTab from "./ui/TrackingImageTab";

import useTabs from "./model/useTabs";
import useSettingMode from "./model/useSettingMode";
import useManageTrackData from "./model/useManageTrackData.js";
import useInfinityScroll from "./model/useInfinityScroll.js";

import useGetTrackingImageList from "../../3_Entity/Tracking/useGetTrackingImageList.js";
import { useParams } from "react-router-dom";
import ConfirmModal from "../../2_Widget/ConfirmModal";
import useModalHandler from "../../4_Shared/model/useModalHandler.js";
import { useState } from "react";

const Profile = () => {
  const { userIdx } = useParams(); // userIdx 추출

  // 에러 핸들링 모달
  const [message, setMessage] = useState("");
  const [confirmModal, comfirmModalToggle] = useModalHandler();

  const { tabState, handleTabClick } = useTabs(); // 탭 관리 훅
  const { modifyMode, handleSetMode, handleCloseMode } = useSettingMode(); // 수정 , 삭제 상태 관리
  const { paging, handleScroll, checkLessLength } = useInfinityScroll(
    tabState.tabIndex
  );

  // 데이터 조회 (userIdx , page , category)
  const { trackingImageList, loading, hasMoreContent } =
    useGetTrackingImageList(userIdx, paging, tabState.tabIndex === 1 ? 0 : 1);

  // 데이터 관리 훅 ( 수정 , 삭제 , 취소)
  const {
    shareTrackingImageData,
    saveTrackingImageData,
    handleAddModifyIdxList,
    handleSelectCancel,
    handleModifyTrack,
    handleDeleteTrack,
  } = useManageTrackData({
    trackingImageList,
    tabState,
    checkLessLength,
    errorModal: { comfirmModalToggle, setMessage },
  });

  return (
    <>
      <STYLE.Main>
        <Header
          setMode={{ modifyMode, handleSetMode, handleCloseMode }}
          tabState={tabState}
          handleTabClick={handleTabClick}
          handler={{
            handleSelectCancel,
            handleDeleteTrack,
            handleModifyTrack,
          }}
        />
        <STYLE.SliderWrapper>
          <STYLE.Slider $tabIndex={tabState?.tabIndex}>
            <TrackingImageTab
              trackData={shareTrackingImageData}
              modifyMode={modifyMode}
              handleScroll={hasMoreContent.share ? handleScroll : null}
              handleAddModifyIdxList={handleAddModifyIdxList}
            />
            <TrackingImageTab
              trackData={saveTrackingImageData}
              modifyMode={modifyMode}
              handleScroll={hasMoreContent.save ? handleScroll : null}
              handleAddModifyIdxList={handleAddModifyIdxList}
            />
          </STYLE.Slider>
        </STYLE.SliderWrapper>
        {loading && (
          <STYLE.LoadingContainer>
            <STYLE.Loading />
          </STYLE.LoadingContainer>
        )}
      </STYLE.Main>
      {confirmModal && (
        <ConfirmModal message={message} onClose={comfirmModalToggle} />
      )}
    </>
  );
};

export default Profile;
