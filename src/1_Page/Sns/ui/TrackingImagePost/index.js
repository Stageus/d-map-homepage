import React from "react";
import TrackingImage from "../../../../2_Widget/TrackingImage";
import useDetailModal from "./model/useDetailModal";
import detail_icon from "./assets/detail.svg";
import like_icon from "./assets/like.svg";
import unlike_icon from "./assets/unlike.svg";
import EventBtn from "./ui/EventBtn";
import useToggleLikeTrackingImage from "./model/useToggleLikeTrackingImage";
import STYLE from "./style";
import TrackingImageLoaderBtn from "./ui/TrackingImageLoaderBtn";

const TrackingImagePost = (props) => {
  const { data } = props;
  const { likecount, idx, liked_by_user } = data;
  const [viewDetailModal, toggleDetailModal] = useDetailModal();
  const [like, toggleLikeTrackingImage] = useToggleLikeTrackingImage(idx, liked_by_user);
  return (
    <STYLE.Container>
      <STYLE.PostInfo>
        <STYLE.PosterName>{data.nickname}</STYLE.PosterName>
        <STYLE.PostUpdated>1달전</STYLE.PostUpdated>
      </STYLE.PostInfo>
      <STYLE.TrackingImageWrapper
        onDoubleClick={() => {
          toggleLikeTrackingImage();
        }}
      >
        <TrackingImage data={{ ...data, height: "70vh" }} />
      </STYLE.TrackingImageWrapper>

      <STYLE.InfoContainer>
        <p>좋아요: {likecount}</p>
        <STYLE.BtnContainer>
          <EventBtn
            icon={like ? like_icon : unlike_icon}
            clickEvent={toggleLikeTrackingImage}
          />
          <EventBtn icon={detail_icon} clickEvent={toggleDetailModal} />
          <TrackingImageLoaderBtn data={data} />
        </STYLE.BtnContainer>
      </STYLE.InfoContainer>

      <STYLE.DetailModal isOpen={viewDetailModal}>
        <TrackingImage data={{ ...data, height: "100%", draggable: true }} />
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
