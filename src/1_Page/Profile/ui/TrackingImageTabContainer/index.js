import STYLE from "./style";
import TrackingImageBox from "./ui/TrackingImageBox";

const TrackingImageTabContainer = (props) => {
  const {
    modifyMode,
    hasMoreContent,
    tabIndex,
    handleTabClick,
    displayTrackingImage,
    setDisplayTrackingImage,
    shareObserveRef,
    setModifyIdxList,
    saveObserveRef,
  } = props;

  const { isMine } =
    displayTrackingImage?.save[0] || displayTrackingImage?.share[0] || false;

  return (
    <>
      <STYLE.TabMenu>
        {isMine ? (
          <>
            <STYLE.Tab
              $active={tabIndex === 0}
              onClick={() => handleTabClick("공유")}>
              공유
            </STYLE.Tab>
            <STYLE.Tab
              $active={tabIndex === 1}
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
          {displayTrackingImage?.share.length === 0 ? (
            <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
          ) : (
            <STYLE.PostGrid>
              {displayTrackingImage?.share.map((trackingImageData, index) => {
                return (
                  <TrackingImageBox
                    key={trackingImageData.idx}
                    obServeRef={
                      hasMoreContent.share &&
                      index === displayTrackingImage.length - 1
                        ? shareObserveRef
                        : null
                    }
                    trackingImageData={trackingImageData}
                    modifyMode={modifyMode}
                    setDisplayTrackingImage={setDisplayTrackingImage}
                    setModifyIdxList={setModifyIdxList}
                  />
                );
              })}
            </STYLE.PostGrid>
          )}
          {displayTrackingImage?.save.length === 0 ? (
            <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
          ) : (
            <STYLE.PostGrid>
              {displayTrackingImage?.save.map((trackingImageData, index) => {
                return (
                  <TrackingImageBox
                    key={trackingImageData.idx}
                    obServeRef={
                      hasMoreContent.save &&
                      index === displayTrackingImage.length - 1
                        ? saveObserveRef
                        : null
                    }
                    trackingImageData={trackingImageData}
                    modifyMode={modifyMode}
                    setDisplayTrackingImage={setDisplayTrackingImage}
                    setModifyIdxList={setModifyIdxList}
                  />
                );
              })}
            </STYLE.PostGrid>
          )}
        </STYLE.Slider>
      </STYLE.SliderWrapper>
    </>
  );
};

export default TrackingImageTabContainer;
