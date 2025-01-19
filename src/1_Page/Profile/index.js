import STYLE from "./style";

import Header from "./ui/Header";
import TrackingImageTab from "./ui/TrackingImageTab";

import useTabs from "./model/useTabs";
import useSettingMode from "./model/useSettingMode";
import useManageTrackData from "./model/useManageTrackData.js";
import useInfinityScroll from "./model/useInfinityScroll.js";

import useGetTrackingImageList from "../../3_Entity/Tracking/useGetTrackingImageList.js";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";

const Profile = () => {
  const { tabState, handleTabClick } = useTabs();
  const { modifyMode, handleSetMode, handleCloseMode } = useSettingMode(); // 수정 , 삭제 상태 관리

  const { userIdx } = useParams(); // userIdx 추출

  const containerRef = useRef(null);
  const containerRef2 = useRef(null);

  const { paging, handleScroll, checkLessLength } = useInfinityScroll(
    tabState.tabIndex,
    containerRef,
    containerRef2
  );

  const { trackingImageList, loading, hasMoreContent } =
    useGetTrackingImageList(userIdx, paging, tabState.tabIndex === 1 ? 0 : 1);

  const {
    shareTrackingImageData,
    saveTrackingImageData,
    handleAddModifyIdxList,
    handleSelectCancel,
    handleModifyTrack,
    handleDeleteTrack,
  } = useManageTrackData(trackingImageList);

  const prevLength = useRef(null);

  useEffect(() => {
    const track =
      tabState.tabIndex === 0 ? shareTrackingImageData : saveTrackingImageData;

    if (track.length === 0) return;

    if (track.length !== prevLength.current) {
      console.log(track.length);
      checkLessLength(track.length);
      prevLength.current = track.length; // 이전 값 저장
    }
  }, [shareTrackingImageData, saveTrackingImageData]);

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
              containerRef={containerRef}
            />
            <TrackingImageTab
              trackData={saveTrackingImageData}
              modifyMode={modifyMode}
              handleScroll={hasMoreContent.save ? handleScroll : null}
              handleAddModifyIdxList={handleAddModifyIdxList}
              containerRef={containerRef2}
            />
          </STYLE.Slider>
        </STYLE.SliderWrapper>
        {loading && (
          <STYLE.LoadingContainer>
            <STYLE.Loading />
          </STYLE.LoadingContainer>
        )}
      </STYLE.Main>
    </>
  );
};

export default Profile;
