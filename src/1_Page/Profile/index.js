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
import useDeleteTrackingImage from "../../3_Entity/Tracking/useDeleteTrackingImage.js";
import usePutTrackingImageToNotShare from "../../3_Entity/Tracking/usePutTrackingImageToNotShare.js";
import usePutTrackingImageToShare from "../../3_Entity/Tracking/usePutTrackingImageToShare.js";

import useGetProfileTrackingImageList from "../../3_Entity/Tracking/useGetProfileTrackingImageList.js";

const Profile = () => {
  // 유저 데이터 조회
  const { userIdx } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [myInfo] = useGetMyInfo(userIdx); // userIdx에 int가 들어가면 호출 X
  const [anotherUserInfo] = useGetUserInfo(userIdx); // userIdx가 int면 호출
  useEffect(() => {
    setUserInfo(userIdx === "me" ? myInfo : anotherUserInfo);
  }, [userIdx]);

  const [tabState, handleTabClick] = useTabs(); // 탭 관리 훅
  const [modifyMode, memoizedSetMode] = useSettingMode(); // 수정 , 삭제 상태 관리

  const [paging, shareObserveRef, saveObserveRef] = useInfinityScroll(
    tabState.tabIndex
  );

  // 데이터 조회 (userIdx , page , category)
  const { trackingImageData, loading, hasMoreContent } =
    useGetProfileTrackingImageList(
      userInfo?.idx,
      paging,
      tabState.tabIndex === 1 ? 0 : 1 // 0 이 공유 , 1이 저장
    );
  const [deleteTrackingImage] = useDeleteTrackingImage();
  const [putTrackingImageToNotShare] = usePutTrackingImageToNotShare();
  const [putTrackingImageToShare] = usePutTrackingImageToShare();

  const [
    trackData,
    modifyIdxList,
    handleModifyTrack,
    handleDeleteTrack,
    toggleModifyIdxList,
    handleSelectCancel,
    changeShareTrackingLength,
    changeSaveTrackingLength,
  ] = useManageData(
    trackingImageData, // { save: [], share: [] }
    deleteTrackingImage,
    putTrackingImageToNotShare,
    putTrackingImageToShare
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
    </>
  );
};

export default Profile;
