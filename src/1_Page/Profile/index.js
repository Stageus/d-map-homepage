import STYLE from "./style";

import Header from "./ui/Header";
import TrackingImageTab from "./ui/TrackingImageTab";

import useTabs from "./model/useTabs";
import useSettingMode from "./model/useSettingMode";
import useManageTrackData from "./model/useManageTrackData.js";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { userIdx } = useParams();
  const { tabState, handleTabClick } = useTabs();
  const { modifyMode, handleSetMode, handleCloseMode } = useSettingMode(); // 수정 , 삭제 상태 관리

  const {
    trackData,
    handleToggleTrackType,
    handleSelectCancel,
    handleModifyTrack,
    handleDeleteTrack,
    handleDeleteAdd,
    getTrackLength,
    handleNextPage,
  } = useManageTrackData(userIdx); // API로 호출된 데이터 관리 훅

  return (
    <>
      <STYLE.Main>
        <Header
          setMode={{ modifyMode, handleSetMode, handleCloseMode }}
          trackData={trackData}
          trackDataLegth={getTrackLength(tabState?.tabIndex)}
          tabState={tabState}
          handleTabClick={handleTabClick}
          handler={{
            handleSelectCancel,
            handleDeleteTrack,
            handleModifyTrack,
          }}
          user={{ userIdx }}
        />
        <STYLE.SliderWrapper>
          <STYLE.Slider $tabIndex={tabState?.tabIndex}>
            <TrackingImageTab
              sharingType={0}
              trackData={trackData}
              length={getTrackLength(0)}
              modifyMode={modifyMode}
              handle={{
                handleDeleteAdd,
                handleToggleTrackType,
                handleNextPage,
              }}
            />
            <TrackingImageTab
              sharingType={1}
              trackData={trackData}
              length={getTrackLength(1)}
              modifyMode={modifyMode}
              handle={{
                handleDeleteAdd,
                handleToggleTrackType,
                handleNextPage,
              }}
            />
          </STYLE.Slider>
        </STYLE.SliderWrapper>
      </STYLE.Main>
    </>
  );
};

export default Profile;
