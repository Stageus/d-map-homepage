import { useNavigate, useParams } from "react-router-dom";
import STYLE from "./style";

import Header from "./ui/Header";
import TrackingImageTab from "./ui/TrackingImageTab";

import useTabs from "./model/useTabs";
import useSettingMode from "./model/useSettingMode";
import useInfinityScroll from "./model/useInfinityScroll.js";
import useManageTrackData from "./model/useManageTrackData.js";
import useGetMyInfo from "../../3_Entity/Account/useGetMyInfo.js";
import useGetUserInfo from "../../3_Entity/Account/useGetUserInfo.js";

import useGetProfileTrackingImageList from "../../3_Entity/Tracking/useGetProfileTrackingImageList.js";

const Profile = () => {
  // 유저 데이터 조회
  const { userIdx } = useParams();
  const [myInfo] = useGetMyInfo(userIdx); // userIdx에 me 또는 공백시 fetch
  const [anotherUserInfo] = useGetUserInfo(userIdx); // userIdx가 int면 fetch
  const userInfoData = myInfo || anotherUserInfo;

  const [tabState, handleTabClick] = useTabs(); // 탭 관리 훅
  const [modifyMode, memoizedSetMode] = useSettingMode(); // 수정 , 삭제 상태 관리

  const [paging, shareObserveRef, saveObserveRef] = useInfinityScroll(
    tabState.tabIndex
  );

  const navigate = useNavigate();

  // 데이터 조회 (userIdx , page , category)
  const [trackingImageData, loading, hasMoreContent] =
    useGetProfileTrackingImageList(
      userInfoData?.idx,
      paging,
      tabState.tabIndex === 1 ? 0 : 1 // 0 이 공유 , 1이 저장
    );

  const [
    trackData,
    modifyIdxList,
    updateSelectedTracks,
    setTrackData,
    setModifyIdxList,
  ] = useManageTrackData(trackingImageData);

  if (!userInfoData) {
    return (
      <STYLE.ErrorContainer>
        <STYLE.EmptyMessage>
          죄송합니다. 존재하지 않는 유저입니다.
        </STYLE.EmptyMessage>
        <STYLE.ErrorMessageBox>
          <STYLE.EmptyMessage>
            링크가 잘못되었거나 삭제되었습니다.
          </STYLE.EmptyMessage>
          <STYLE.BackButton onClick={() => navigate("/")}>
            처음으로 돌아가기
          </STYLE.BackButton>
        </STYLE.ErrorMessageBox>
      </STYLE.ErrorContainer>
    );
  }

  return (
    <>
      <STYLE.Main>
        <Header
          setMode={memoizedSetMode}
          activeTabStr={tabState?.activeTabStr}
          userInfoData={userInfoData}
          handleTabClick={handleTabClick}
          modifyIdxList={modifyIdxList}
          trackData={trackData}
          trackingImageData={trackingImageData}
          setTrackData={setTrackData}
          setModifyIdxList={setModifyIdxList}
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
