import STYLE from "./style";
import TrackingImagePost from "./ui/TrackingImagePost";
const TrackingImagePostList = (props) => {
  const { trackingImageList = [], hasMoreContent = false, observeRef = null } = props;
  console.log("render")
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
