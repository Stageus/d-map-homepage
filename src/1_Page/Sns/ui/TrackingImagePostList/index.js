import STYLE from "./style";
import TrackingImagePost from "./ui/TrackingImagePost";
const TrackingImagePostList = (props) => {
  const { trackingImageList, hasMoreContent, observeRef } = props;
  return (
    <STYLE.TrackingList>
      {trackingImageList.map((elem, index) => {
        return (
          <STYLE.TrackingContainer
            key={index}
            ref={
              index === trackingImageList.length - 1 && hasMoreContent
                ? observeRef
                : null
            }
          >
            <TrackingImagePost data={elem} />
          </STYLE.TrackingContainer>
        );
      })}
    </STYLE.TrackingList>
  );
};

export default TrackingImagePostList;
