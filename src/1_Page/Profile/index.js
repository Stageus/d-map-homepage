import STYLE from "./style";

import Header from "./ui/Header";
import TrackingImageTab from "./ui/TrackingImageTab";

import useTabs from "./model/useTabs";
import useSettingMode from "./model/useSettingMode";
import useManageTrackData from "./model/useManageTrackData.js";

const Profile = () => {
  const { tabState, handleTabClick } = useTabs();
  const { modifyMode, handleSetMode, handleCloseMode } = useSettingMode(); // 수정 , 삭제 상태 관리

  const {
    shareTrackingImageData,
    saveTrackingImageData,
    handleAddModifyIdxList,
    handleSelectCancel,
    handleModifyTrack,
    handleDeleteTrack,
    handleScroll,
  } = useManageTrackData(tabState?.tabIndex); // API로 호출된 데이터 관리 훅

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
              handleScroll={handleScroll}
              handleAddModifyIdxList={handleAddModifyIdxList}
            />
            <TrackingImageTab
              trackData={saveTrackingImageData}
              modifyMode={modifyMode}
              handleScroll={handleScroll}
              handleAddModifyIdxList={handleAddModifyIdxList}
            />
          </STYLE.Slider>
        </STYLE.SliderWrapper>
      </STYLE.Main>
    </>
  );
};

export default Profile;
