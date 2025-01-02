import React from "react";
import TrackingImage from "../../../../2_Widget/TrackingImage";
import useDetailModal from "./model/useDetailModal";
import detail_icon from "./assets/detail.svg"
import like_icon from "./assets/like.svg"
import unlike_icon from "./assets/unlike.svg"
import open_in_tracking_page_icon from "./assets/openInTrackingPage.svg"
import EventBtn from "./ui/EventBtn";
import useToggleLikeTrackingImage from "./model/useToggleLikeTrackingImage";
import STYLE from "./style";
import { useNavigate } from "react-router-dom";

const TrackingImagePost = (props) => {
  const { data } = props;
  const {likecount, idx} = data;
  const [viewDetailModal, toggleDetailModal] = useDetailModal();
  const [like, toggleLikeTrackingImage] = useToggleLikeTrackingImage(idx);
  const navigate = useNavigate();

  return (
    <STYLE.Container onDoubleClick={()=>{toggleLikeTrackingImage()}}>
      <TrackingImage data={data} />
      
      <STYLE.InfoContainer>
        <p>좋아요: {likecount}</p>
        <STYLE.BtnContainer>
          <EventBtn icon={like ? like_icon : unlike_icon} clickEvent={toggleLikeTrackingImage} />
          <EventBtn icon={detail_icon} clickEvent={toggleDetailModal}/>
          <EventBtn icon={open_in_tracking_page_icon} clickEvent={()=>{navigate("/tracking")}}/>
        </STYLE.BtnContainer>
      </STYLE.InfoContainer>

      <STYLE.DetailModal isOpen={viewDetailModal}>
        <TrackingImage data={{ ...data, height: "100%" }} />
        {/* 상세보기 모달에 z-index 1 */}
        <STYLE.Button
          onClick={() => {
            toggleDetailModal();
          }}
        >
          X
        </STYLE.Button>
      </STYLE.DetailModal>
    </STYLE.Container>
  );
};

export default TrackingImagePost;
