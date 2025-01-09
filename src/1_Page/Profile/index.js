import STYLE from "./style";

import Header from "./ui/Header";
import Loading from "../../2_Widget/Loading";
import TrackingImageTab from "./ui/TrackingImageTab";

import useTabs from "./model/useTabs";
import useSettingMode from "./model/useSettingMode";
import useManageTrackData from "./model/useManageTrackData";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Profile = () => {
  const isLogin = true;
  const { userIdx } = useParams();
  const { activeTab, tabIndex, handleTabClick } = useTabs();
  const { modifyMode, handleSetMode, handleCloseMode } = useSettingMode(); // 수정 , 삭제 상태 관리

  const [page, setPage] = useState(1);

  const {
    trackData,
    trackLoading,
    trackError,
    handleToggleTrackType,
    handleSelectCancel,
    handleModifyTrack,
    handleDeleteTrack,
    handleDeleteAdd,
    getTrackLength,
  } = useManageTrackData(userIdx); // API로 호출된 데이터 관리 훅

  return (
    <>
      <STYLE.Main>
        <Header
          setMode={{ modifyMode, handleSetMode, handleCloseMode }}
          trackData={trackData}
          getTrackLength={getTrackLength}
          activeTab={activeTab}
          handler={{
            handleSelectCancel,
            handleDeleteTrack,
            handleModifyTrack,
          }}
          user={{ userIdx }}
        />
        <STYLE.TabMenu>
          {isLogin ? (
            <>
              <STYLE.Tab
                active={activeTab === "공유"}
                onClick={() => handleTabClick("공유")}>
                공유
              </STYLE.Tab>
              <STYLE.Tab
                active={activeTab === "저장"}
                onClick={() => handleTabClick("저장")}>
                저장
              </STYLE.Tab>
            </>
          ) : (
            <STYLE.TabNone>게시물</STYLE.TabNone>
          )}
        </STYLE.TabMenu>
        <STYLE.SliderWrapper>
          <STYLE.Slider $tabIndex={tabIndex}>
            <TrackingImageTab
              sharingType={0}
              trackData={trackData}
              getTrackLength={getTrackLength}
              modifyMode={modifyMode}
              handle={{ handleDeleteAdd, handleToggleTrackType }}
            />
            <TrackingImageTab
              sharingType={1}
              trackData={trackData}
              getTrackLength={getTrackLength}
              modifyMode={modifyMode}
              handle={{ handleDeleteAdd, handleToggleTrackType }}
            />
          </STYLE.Slider>
        </STYLE.SliderWrapper>
      </STYLE.Main>
    </>
  );
};

export default Profile;
