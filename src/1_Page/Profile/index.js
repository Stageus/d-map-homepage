import STYLE from "./style";

import Header from "./ui/Header";
import TrackTabSlider from "./ui/TrackTabSlider";
import Loading from "../../2_Widget/Loading";

import useTabs from "./model/useTabs";
import useSettingMode from "./model/useSettingMode";
import useData from "./model/useData";
import { useParams } from "react-router-dom";

const Profile = () => {
  const name = "김재걸";
  const { userIdx } = useParams();

  const { activeTab, tabIndex, handleTabClick } = useTabs();
  const { modifyMode, handleSetMode, handleCloseMode } = useSettingMode(); // 수정 , 삭제 상태 관리

  const {
    trackData,
    trackLoading,
    trackError,
    handleToggleSharing,
    handleCancel,
  } = useData(userIdx); // API로 호출된 데이터 관리 훅

  // 로딩 애러 처리
  if (trackLoading) return <Loading />;
  if (trackError) return <Loading />;

  return (
    <>
      <STYLE.Main>
        <Header
          setMode={{ modifyMode, handleSetMode, handleCloseMode }}
          data={trackData}
          activeTab={activeTab}
          handleCancel={handleCancel}
          user={{ userIdx, name }}
        />
        <STYLE.TabMenu>
          {userIdx ? (
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
        <TrackTabSlider
          modifyMode={modifyMode}
          handleToggleSharing={handleToggleSharing}
          data={trackData}
          tabIndex={tabIndex}
        />
      </STYLE.Main>
    </>
  );
};

export default Profile;
