import { useNavigate, useParams } from "react-router-dom";
import STYLE from "./style";

import Header from "./ui/Header";
import TrackingImageTab from "./ui/TrackingImageTab";

import useTabs from "./model/useTabs";
import useSettingMode from "./model/useSettingMode";
import useInfinityScroll from "./model/useInfinityScroll.js";
import useManageTrackData from "./model/useManageTrackData.js";

import useGetProfileTrackingImageList from "../../3_Entity/Tracking/useGetProfileTrackingImageList.js";
import { useState } from "react";

let profile = 0;
const Profile = () => {
  const { userIdx } = useParams();

  const [tabState, handleTabClick] = useTabs(); // 탭 관리 훅
  const [modifyMode, memoizedSetMode] = useSettingMode(); // 수정 , 삭제 상태 관리
  const [shareTabPage, shareObserveRef] = useInfinityScroll();
  const [saveTabPage, saveObserveRef] = useInfinityScroll();

  // 데이터 조회 (userIdx , [page] , tabIndex)
  const [trackingImageData, loading, hasMoreContent] =
    useGetProfileTrackingImageList(
      userIdx,
      [shareTabPage, saveTabPage],
      tabState.tabIndex
    );

  // 수정상태 데이터 관리 state
  const [modifyIdxList, setModifyIdxList] = useState([]);
  const [
    displayTrackingImage,
    setDisplayTrackingImage,
    backupTrackingImageData,
  ] = useManageTrackData(trackingImageData, modifyMode);

  profile += 1;
  console.log("프로필", profile);
  return (
    <>
      <STYLE.Main>
        <Header
          setMode={memoizedSetMode}
          activeTabStr={tabState?.activeTabStr}
          handleTabClick={handleTabClick}
          modifyIdxList={modifyIdxList}
          displayTrackingImage={displayTrackingImage}
          setDisplayTrackingImage={setDisplayTrackingImage}
          setModifyIdxList={setModifyIdxList}
          backupTrackingImageData={backupTrackingImageData}
        />
        <STYLE.SliderWrapper>
          <STYLE.Slider $tabIndex={tabState?.tabIndex}>
            <TrackingImageTab
              displayTrackingImage={displayTrackingImage.share}
              modifyMode={modifyMode}
              obServeRef={hasMoreContent.share ? shareObserveRef : null}
              setDisplayTrackingImage={setDisplayTrackingImage}
              setModifyIdxList={setModifyIdxList}
            />
            <TrackingImageTab
              displayTrackingImage={displayTrackingImage.save}
              modifyMode={modifyMode}
              obServeRef={hasMoreContent.save ? saveObserveRef : null}
              setDisplayTrackingImage={setDisplayTrackingImage}
              setModifyIdxList={setModifyIdxList}
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
