import { useParams } from "react-router-dom";
import STYLE from "./style";

import ProfileHeader from "./ui/ProfileHeader";

import useTabs from "./model/useTabs";
import useSettingMode from "./model/useSettingMode";
import useInfinityScroll from "./model/useInfinityScroll.js";
import useManageTrackData from "./model/useManageTrackData.js";

import useGetProfileTrackingImageList from "../../3_Entity/Tracking/useGetProfileTrackingImageList.js";
import { useState } from "react";
import TrackingImageTabContainer from "./ui/TrackingImageTabContainer/index.js";

const Profile = () => {
  const { userIdx } = useParams();

  const [tabState, handleTabClick] = useTabs(); // 탭 관리 훅
  const [modifyMode, handleSetMode, handleCloseMode] = useSettingMode(); // 수정 , 삭제 상태 관리
  const [publicTabPage, publicObserveRef] = useInfinityScroll();
  const [privateTabPage, privateObserveRef] = useInfinityScroll();

  // 데이터 조회 (userIdx , [page] , tabIndex)
  const [trackingImageData, loading, hasMoreContent] =
    useGetProfileTrackingImageList(
      userIdx,
      tabState.tabIndex === 0 ? publicTabPage : privateTabPage,
      tabState.tabIndex
    );

  // 수정상태 데이터 관리 state
  const [modifyIdxList, setModifyIdxList] = useState([]);
  const [
    displayTrackingImage,
    setDisplayTrackingImage,
    backupTrackingImageData,
  ] = useManageTrackData(trackingImageData, modifyMode);

  return (
    <>
      <STYLE.Main>
        <ProfileHeader
          handleSetMode={handleSetMode}
          activeTabStr={tabState?.activeTabStr}
          handleTabClick={handleTabClick}
          modifyMode={modifyMode}
          handleCloseMode={handleCloseMode}
          modifyIdxList={modifyIdxList}
          setDisplayTrackingImage={setDisplayTrackingImage}
          setModifyIdxList={setModifyIdxList}
          backupTrackingImageData={backupTrackingImageData}
        />
      </STYLE.Main>

      <TrackingImageTabContainer
        modifyMode={modifyMode}
        hasMoreContent={hasMoreContent}
        tabIndex={tabState.tabIndex}
        handleTabClick={handleTabClick}
        displayTrackingImage={displayTrackingImage}
        setDisplayTrackingImage={setDisplayTrackingImage}
        privateObserveRef={privateObserveRef}
        publicObserveRef={publicObserveRef}
        setModifyIdxList={setModifyIdxList}
      />

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
