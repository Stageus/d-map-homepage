import STYLE from "./style";

import Header from "./ui/Header";
import TrackingImageTab from "./ui/TrackingImageTab";

import useTabs from "./model/useTabs";
import useSettingMode from "./model/useSettingMode";
import useManageTrackData from "./model/useManageTrackData.js";
import useObserver from "./model/useObserver.js";

const Profile = () => {
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
  } = useManageTrackData(); // API로 호출된 데이터 관리 훅

  const [lastSaveElementRef, lastShareElementRef] = useObserver(handleNextPage);

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
        />
        <STYLE.SliderWrapper>
          <STYLE.Slider $tabIndex={tabState?.tabIndex}>
            <TrackingImageTab
              sharingType={true}
              trackData={trackData}
              length={getTrackLength(true)}
              modifyMode={modifyMode}
              lastElementRef={lastShareElementRef}
              handle={{
                handleDeleteAdd,
                handleToggleTrackType,
              }}
            />
            <TrackingImageTab
              sharingType={false}
              trackData={trackData}
              length={getTrackLength(false)}
              modifyMode={modifyMode}
              lastElementRef={lastSaveElementRef}
              handle={{
                handleDeleteAdd,
                handleToggleTrackType,
              }}
            />
          </STYLE.Slider>
        </STYLE.SliderWrapper>
      </STYLE.Main>
    </>
  );
};

export default Profile;
