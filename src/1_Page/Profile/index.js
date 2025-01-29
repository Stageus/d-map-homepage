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
import { useState } from "react";

let profile = 0;
const Profile = () => {
  // 유저 데이터 조회
  const navigate = useNavigate();
  const { userIdx } = useParams();
  const [myInfo] = useGetMyInfo(userIdx); // userIdx에 me 또는 공백시 fetch
  const [anotherUserInfo] = useGetUserInfo(userIdx); // userIdx가 int면 fetch
  const userInfoData = myInfo || anotherUserInfo;

  const [tabState, handleTabClick] = useTabs(); // 탭 관리 훅
  const [modifyMode, memoizedSetMode] = useSettingMode(); // 수정 , 삭제 상태 관리

  const [shareTabPage, shareObserveRef] = useInfinityScroll();
  const [saveTabPage, saveObserveRef] = useInfinityScroll();
  // 데이터 조회 (userIdx , page , category)
  const [trackingImageData, loading, hasMoreContent] =
    useGetProfileTrackingImageList(
      userInfoData?.idx,
      [shareTabPage, saveTabPage],
      tabState.tabIndex
    );

  // 수정 state
  const [modifyIdxList, setModifyIdxList] = useState([]);
  const [displayTrackingImage, setDisplayTrackingImage, backupTrackData] =
    useManageTrackData(trackingImageData, modifyMode);

  profile += 1;
  console.log("프로필", profile);
  return (
    <>
      {!userInfoData ? (
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
      ) : (
        <STYLE.Main>
          <Header
            setMode={memoizedSetMode}
            activeTabStr={tabState?.activeTabStr}
            userInfoData={userInfoData}
            handleTabClick={handleTabClick}
            modifyIdxList={modifyIdxList}
            displayTrackingImage={displayTrackingImage}
            setDisplayTrackingImage={setDisplayTrackingImage}
            setModifyIdxList={setModifyIdxList}
            backupTrackData={backupTrackData}
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
      )}

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
