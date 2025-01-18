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
    handleNextPage,
  } = useManageTrackData(tabState?.tabIndex); // API로 호출된 데이터 관리 훅

  const handleScroll = useObserver(handleNextPage);

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
              trackData={trackData?.share}
              modifyMode={modifyMode}
              // scrollContainerRef={scrollContainerSaveRef}
              handleScroll={handleScroll}
              handle={{
                handleDeleteAdd,
                handleToggleTrackType,
              }}
            />
            <TrackingImageTab
              trackData={trackData?.save}
              modifyMode={modifyMode}
              handleScroll={handleScroll}
              // scrollContainerRef={scrollContainerShareRef}
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
