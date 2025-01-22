import ReactDOM from "react-dom";
import STYLE from "./style";
import TrackingImagePostList from "../../../../../../2_Widget/TrackingImagePostList";
import useInfiniteScrollPaging from "./model/useInfiniteScrollPaging";
import { useEffect } from "react";

const TrackingImagePostListModal = (props) => {
  const { onClose, handleNextPage, hasMoreContent, trackingImageList } = props;
  const [ref] = useInfiniteScrollPaging(handleNextPage, hasMoreContent);

  useEffect(() => {
    console.log(trackingImageList);
  }, [trackingImageList]);

  return ReactDOM.createPortal(
    <STYLE.ModalOverlay onClick={onClose}>
      <STYLE.ModalContent onClick={(e) => e.stopPropagation()}>
        <STYLE.CloseButton onClick={onClose}>&times;</STYLE.CloseButton>
        <TrackingImagePostList
          trackingImageList={trackingImageList}
          hasMoreContent={hasMoreContent}
          observeRef={ref}
        />
      </STYLE.ModalContent>
    </STYLE.ModalOverlay>,
    document.body // Portal로 이동
  );
};

export default TrackingImagePostListModal;
