import ReactDOM from "react-dom";
import STYLE from "./style";
import TrackingImagePostList from "../../../../../../2_Widget/TrackingImagePostList";

const TrackingImagePostListModal = (props) => {
  const { observeRef, onClose, hasMoreContent, trackingImageList } = props;

  return ReactDOM.createPortal(
    <STYLE.ModalOverlay onClick={onClose}>
      <STYLE.ModalContent onClick={(e) => e.stopPropagation()}>
        <STYLE.CloseButton onClick={onClose}>&times;</STYLE.CloseButton>
        <TrackingImagePostList
          trackingImageList={trackingImageList}
          hasMoreContent={hasMoreContent}
          observeRef={observeRef}
        />
      </STYLE.ModalContent>
    </STYLE.ModalOverlay>,
    document.body
  );
};

export default TrackingImagePostListModal;
