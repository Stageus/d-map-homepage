import STYLE from "./style";

import Header from "./ui/Header";
import TrackingContiner from "./ui/TrackContainer";
import Loading from "../../2_Widget/Loading";

import useTabs from "./model/useTabs";
import useAuthor from "./model/useAuthor";
import useSettingMode from "./model/useSettingMode";
import useData from "./model/useData";
import useTrackData from "./api/useTrackingList";

const Profile = () => {
  const name = "김재걸";
  const { track, trackLoading, trackError } = useTrackData("idx"); // 데이터 호출

  const { author, handleAuthorTrue, handleAuthorFalse } = useAuthor();

  const { activeTab, tabIndex, handleTabClick } = useTabs();
  const { modifyMode, handleSetMode, handleCloseMode } = useSettingMode(); // 수정 , 삭제 상태 관리

  const { data, handleAnotherType, handleCancel } = useData(track, modifyMode); // API로 호출된 데이터 관리 훅

  // 로딩 애러 처리
  if (trackLoading) return <Loading />;
  if (trackError) return <Loading />;

  return (
    <>
      <STYLE.Main>
        <Header
          setMode={{ modifyMode, handleSetMode, handleCloseMode }}
          data={data}
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
              {data.shareData?.length === 0 ? (
                <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
              ) : (
                data.shareData?.map((track) => (
                  <TrackingContiner
                    track={track}
                    modifyMode={modifyMode}
                    author={author}
                    handleAnotherType={handleAnotherType}
                  />
                ))
              )}
            </STYLE.PostGrid>
            <STYLE.PostGrid>
              {data.saveData?.length === 0 ? (
                <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
              ) : (
                data.saveData?.map((track) => (
                  <TrackingContiner
                    track={track}
                    modifyMode={modifyMode}
                    author={author}
                    handleAnotherType={handleAnotherType}
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
