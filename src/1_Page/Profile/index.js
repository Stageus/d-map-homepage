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

import useGetProfileTrackingImageList from "../../3_Entity/Tracking/useGetProfileTrackingImageList.js";

const Profile = () => {
  // 유저 데이터 조회
  const { userIdx } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [myInfo] = useGetMyInfo(userIdx); // userIdx에 me 또는 공백시 호출
  const [anotherUserInfo] = useGetUserInfo(userIdx); // userIdx가 me가 아니면 호출

  useEffect(() => {
    if (userInfo && !userIdx) return;
    setUserInfo(userIdx === "me" ? myInfo : anotherUserInfo);
  }, [userIdx, myInfo, anotherUserInfo]);

  const [tabState, handleTabClick] = useTabs(); // 탭 관리 훅
  const [modifyMode, memoizedSetMode] = useSettingMode(); // 수정 , 삭제 상태 관리

  const [paging, shareObserveRef, saveObserveRef] = useInfinityScroll(
    tabState.tabIndex
  );

  // 데이터 조회 (userIdx , page , category)
  const [trackingImageData, loading, hasMoreContent] =
    useGetProfileTrackingImageList(
      userInfo?.idx,
      paging,
      tabState.tabIndex === 1 ? 0 : 1 // 0 이 공유 , 1이 저장
    );

  const [
    trackData,
    changeTrackingLength,
    modifyIdxList,
    setDeleteTrigger, // 삭제 트리거 핸들러 제공
    setModifyTrigger, // 수정 트리거 핸들러 제공
    updateSelectedTracks,
    handleSelectCancel,
  ] = useManageData(trackingImageData);

  return (
    <>
      <STYLE.Main>
        <Header
          setMode={memoizedSetMode}
          setDeleteTrigger={setDeleteTrigger}
          setModifyTrigger={setModifyTrigger}
          changeTrackingLength={changeTrackingLength}
          activeTabStr={tabState?.activeTabStr}
          handleTabClick={handleTabClick}
          handleSelectCancel={handleSelectCancel}
          userInfoData={userInfo}
          isModifyListEmpty={modifyIdxList.length === 0}
        />
        <STYLE.SliderWrapper>
          <STYLE.Slider $tabIndex={tabState?.tabIndex}>
            <TrackingImageTab
              trackingImageList={trackData.share}
              modifyMode={modifyMode}
              obServeRef={hasMoreContent.share ? shareObserveRef : null}
              updateSelectedTracks={updateSelectedTracks}
            />
            <TrackingImageTab
              trackingImageList={trackData.save}
              modifyMode={modifyMode}
              obServeRef={hasMoreContent.save ? saveObserveRef : null}
              updateSelectedTracks={updateSelectedTracks}
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
