import STYLE from "./style";
import TrackingImageBox from "./ui/TrackingImageBox";

const TrackingImageTabContainer = (props) => {
  const {
    modifyMode,
    hasMoreContent,
    tabIndex,
    displayTrackingImage,
    setDisplayTrackingImage,
    shareObserveRef,
    setModifyIdxList,
    saveObserveRef,
  } = props;

  return (
    <>
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
                      hasMoreContent?.share &&
                      index === displayTrackingImage?.share.length - 1
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
                      hasMoreContent?.save &&
                      index === displayTrackingImage?.save.length - 1
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
