import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import STYLE from "./style";

import Header from "./ui/Header";
import TrackingImageTab from "./ui/TrackingImageTab";

import useTabs from "./model/useTabs";
import useSettingMode from "./model/useSettingMode";
import useInfinityScroll from "./model/useInfinityScroll.js";
import useManageData from "./model/useManageData.js";
import useGetMyInfo from "../../3_Entity/Account/useGetMyInfo.js";
import useGetUserInfo from "../../3_Entity/Account/useGetUserInfo.js";
import useErrorModal from "./model/useModalHandler.js";

import useGetTrackingImageList from "../../3_Entity/Tracking/useGetTrackingImageList.js";
import ConfirmModal from "../../2_Widget/ConfirmModal";

const Profile = () => {
  const { userIdx } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  // 유저 데이터 조회
  const [myInfo] = useGetMyInfo();
  const [anotherUserInfo] = useGetUserInfo(userIdx);

  useEffect(() => {
    if (userIdx === "me") {
      setUserInfo(myInfo);
      return;
    }
    setUserInfo(anotherUserInfo);
  }, [userIdx]);

  const { tabState, handleTabClick } = useTabs(); // 탭 관리 훅
  const { modifyMode, memoizedSetMode } = useSettingMode(); // 수정 , 삭제 상태 관리
  const { paging, checkLessLength, shareObserveRef, saveObserveRef } =
    useInfinityScroll(tabState.tabIndex);

  const { errorMessage, isModalOpen, showErrorModal, errorModalBackPage } =
    useErrorModal(); // 에러 표시 모달

  // 데이터 조회 (userIdx , page , category)
  const { trackingImageData, loading, hasMoreContent } =
    useGetTrackingImageList(
      userInfo?.idx,
      paging,
      tabState.tabIndex === 1 ? 0 : 1 // 0 이 공유 , 1이 저장
    );

  const {
    trackData,
    modifyIdxList,
    handleModifyTrack,
    handleDeleteTrack,
    toggleModifyIdxList,
    handleSelectCancel,
    changeShareTrackingLength,
    changeSaveTrackingLength,
  } = useManageData(
    trackingImageData, // { save: [], share: [] }
    tabState.tabIndex,
    checkLessLength,
    showErrorModal
  );

  return (
    <>
      <STYLE.Main>
        <Header
          setMode={memoizedSetMode}
          deleteClick={handleDeleteTrack}
          modifyClick={handleModifyTrack}
          activeTabStr={tabState?.activeTabStr}
          handleTabClick={handleTabClick}
          handleSelectCancel={handleSelectCancel}
          userInfoData={userInfo}
          changeShareTrackingLength={changeShareTrackingLength}
          changeSaveTrackingLength={changeSaveTrackingLength}
          isModifyListEmpty={modifyIdxList.length === 0}
        />
        <STYLE.SliderWrapper>
          <STYLE.Slider $tabIndex={tabState?.tabIndex}>
            <TrackingImageTab
              trackingImageList={trackData.save}
              modifyMode={modifyMode}
              obServeRef={hasMoreContent.share ? shareObserveRef : null}
              handleAddModifyIdxList={toggleModifyIdxList}
            />
            <TrackingImageTab
              trackingImageList={trackData.share}
              modifyMode={modifyMode}
              obServeRef={hasMoreContent.save ? saveObserveRef : null}
              handleAddModifyIdxList={toggleModifyIdxList}
            />
          </STYLE.Slider>
        </STYLE.SliderWrapper>
      </STYLE.Main>

      {loading && (
        <STYLE.LoadingContainer>
          <STYLE.LoadingBox>
            <STYLE.Loading />
          </STYLE.LoadingBox>
        </STYLE.LoadingContainer>
      )}

      {isModalOpen && (
        <ConfirmModal
          message={errorMessage}
          onClose={errorModalBackPage}
          type="one"
        />
      )}
    </>
  );
};

export default Profile;
