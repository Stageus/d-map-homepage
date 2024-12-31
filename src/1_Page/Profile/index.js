import STYLE from "./style";

import Header from "./ui/Header";
import TrackTabSlider from "./ui/TrackTabSlider";
import Loading from "../../2_Widget/Loading";

import useTabs from "./model/useTabs";
import useSettingMode from "./model/useSettingMode";
import useManageTrackData from "./model/useManageTrackData";
import { useParams } from "react-router-dom";

const Profile = () => {
  const isLogin = true;
  const { userIdx } = useParams();
  const { activeTab, tabIndex, handleTabClick } = useTabs();
  const { modifyMode, handleSetMode, handleCloseMode } = useSettingMode(); // 수정 , 삭제 상태 관리

  const {
    trackData,
    trackLoading,
    trackError,
    getLengthSharing,
    handleToggleSharing,
    handleCancel,
    handleModify,
    handleDelete,
    handleDeleteAdd,
  } = useManageTrackData(userIdx); // API로 호출된 데이터 관리 훅

  // 로딩 애러 처리
  if (trackLoading) return <Loading />;
  if (trackError) return <Loading />;

  return (
    <>
      <STYLE.Main>
        <Header
          setMode={{ modifyMode, handleSetMode, handleCloseMode }}
          trackData={trackData}
          getLengthSharing={getLengthSharing}
          activeTab={activeTab}
          handleCancel={handleCancel}
          handleDelete={handleDelete}
          handleModify={handleModify}
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
        <TrackTabSlider
          modifyMode={modifyMode}
          handleToggleSharing={handleToggleSharing}
          handleDeleteAdd={handleDeleteAdd}
          trackData={trackData}
          getLengthSharing={getLengthSharing}
          tabIndex={tabIndex}
        />
      </STYLE.Main>
    </>
  );
};

export default Profile;
