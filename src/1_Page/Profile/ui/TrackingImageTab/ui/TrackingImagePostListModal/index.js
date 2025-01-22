import ReactDOM from "react-dom";
import STYLE from "./style";
import TrackingImagePostList from "../../../../../../2_Widget/TrackingImagePostList";
import useInfiniteScrollPaging from "./model/useInfiniteScrollPaging";

const TrackingImagePostListModal = (props) => {
  const { onClose, handleNextPage, hasMoreContent, trackingImageList } = props;
  const [ref] = useInfiniteScrollPaging(handleNextPage, hasMoreContent);

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
    document.body
  );
};

export default TrackingImagePostListModal;
