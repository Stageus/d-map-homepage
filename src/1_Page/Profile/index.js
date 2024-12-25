import STYLE from "./style";

import Header from "./ui/Header";
import TrackingContiner from "./ui/TrackContainer";
import useTrackData from "./api/useTrackingList";

import useTabs from "./model/useTabs";
import useAuthor from "./model/useAuthor";
import useSettingMode from "./model/useSettingMode";
import useData from "./model/useData";

import Loading from "../../2_Widget/Loading";
import { useEffect } from "react";

const Profile = () => {
  const name = "김재걸";
  const { trackShareData, trackSaveData, trackLoading, trackError } =
    useTrackData("idx");

  const { activeTab, tabIndex, handleTabClick } = useTabs();
  const { author, handleAuthorTrue, handleAuthorFalse } = useAuthor();
  const { modifyMode, handleSetMode, handleCloseMode } = useSettingMode(); // 수정 , 삭제 상태 관리
  const { shareData, saveData, setShareData, setSaveData, handleCancel } =
    useData(trackShareData, trackSaveData, modifyMode);

  // 로딩 애러 처리
  if (trackLoading) return <Loading />;
  if (trackError) return <Loading />;

  return (
    <>
      <STYLE.Main>
        <Header
          setMode={{ modifyMode, handleSetMode, handleCloseMode }}
          data={{ shareData, saveData }}
          activeTab={activeTab}
          handleCancel={handleCancel}
          user={{ author, name }}
        />
        <STYLE.TabMenu>
          {author ? (
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
        <STYLE.SliderWrapper tabIndex={tabIndex}>
          <STYLE.Slider tabIndex={tabIndex}>
            <STYLE.PostGrid>
              {shareData?.length === 0 ? (
                <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
              ) : (
                shareData?.map((data) => (
                  <TrackingContiner
                    data={data}
                    modifyMode={modifyMode}
                    author={author}
                    totalData={(shareData, saveData, setSaveData, setSaveData)}
                  />
                ))
              )}
            </STYLE.PostGrid>
            <STYLE.PostGrid>
              {saveData?.length === 0 ? (
                <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
              ) : (
                saveData?.map((data) => (
                  <TrackingContiner
                    data={data}
                    modifyMode={modifyMode}
                    author={author}
                    totalData={(shareData, saveData, setSaveData, setSaveData)}
                  />
                ))
              )}
            </STYLE.PostGrid>
          </STYLE.Slider>
        </STYLE.SliderWrapper>
      </STYLE.Main>
    </>
  );
};

export default Profile;
