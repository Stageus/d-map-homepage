import STYLE from "./style";
import TrackingImageBox from "./ui/TrackingImageBox";

const TrackingImageTabContainer = (props) => {
  const {
    modifyMode,
    hasMoreContent,
    tabIndex,
    displayTrackingImage,
    setDisplayTrackingImage,
    setModifyIdxList,
    privateObserveRef,
    publicObserveRef,
  } = props;

  return (
    <>
      <STYLE.SliderWrapper>
        <STYLE.Slider $tabIndex={tabIndex}>
          {displayTrackingImage?.public.length === 0 ? (
            <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
          ) : (
            <STYLE.PostGrid>
              {displayTrackingImage?.public.map((trackingImageData, index) => {
                return (
                  <TrackingImageBox
                    key={trackingImageData.idx}
                    obServeRef={
                      hasMoreContent?.public &&
                      index === displayTrackingImage?.public.length - 1
                        ? publicObserveRef
                        : null
                    }
                    isPublic={true}
                    trackingImageData={trackingImageData}
                    modifyMode={modifyMode}
                    setDisplayTrackingImage={setDisplayTrackingImage}
                    setModifyIdxList={setModifyIdxList}
                  />
                );
              })}
            </STYLE.PostGrid>
          )}
          {displayTrackingImage?.private.length === 0 ? (
            <STYLE.EmptyMessage>게시물이 없습니다.</STYLE.EmptyMessage>
          ) : (
            <STYLE.PostGrid>
              {displayTrackingImage?.private.map((trackingImageData, index) => {
                return (
                  <TrackingImageBox
                    key={trackingImageData.idx}
                    obServeRef={
                      hasMoreContent?.private &&
                      index === displayTrackingImage?.private.length - 1
                        ? privateObserveRef
                        : null
                    }
                    isPublic={false}
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
