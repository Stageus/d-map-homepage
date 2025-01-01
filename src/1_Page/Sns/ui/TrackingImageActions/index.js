import STYLE from "./style";
import React from "react";
import LikeBtn from "./ui/LikeBtn";
import useDetailModal from "./model/useDetailModal";
import TrackingImage from "../../../../2_Widget/TrackingImage";
import EventBtn from "./ui/EventBtn";
import detail_icon from "./assets/detail.svg"
import open_in_tracking_page_icon from "./assets/openInTrackingPage.svg"
import { useNavigate } from "react-router-dom";
const TrackingImageActions = (props) => {
  const { data } = props;
  const { likecount } = data;
  const navigate = useNavigate();
  const [viewDetailModal, toggleDetailModal] = useDetailModal();
  return (
    <>
      <STYLE.InfoContainer>
        <p>좋아요: {likecount}</p>
        <STYLE.BtnContainer>
          <LikeBtn trackingImageIdx={data.idx}/>
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

    </>
  );
};

export default TrackingImageActions;
