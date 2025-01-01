import React from "react";
import STYLE from "./style";
import like_icon from "../../assets/like.svg";
import un_like_icon from "../../assets/unlike.svg";
import useToggleLikeTrackingImage from "./model/useToggleLikeTrackingImage";
const LikeBtn = (props) => {
  const { trackingImageIdx } = props;
  const [like, toggleLikeTrackingImage] = useToggleLikeTrackingImage(trackingImageIdx);

  return (
    <>
      <STYLE.Button
        onClick={() => {
          toggleLikeTrackingImage(trackingImageIdx);
        }}
      >
        <STYLE.IconImg src={like ? like_icon : un_like_icon} alt="like" />
      </STYLE.Button>
    </>
  );
};

export default LikeBtn;
