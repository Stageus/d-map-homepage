import React from "react";
import useLikeTrackingImage from "../../../../../../../3_Entity/SNS/useLikeTrackingImage";
import useUnLikeTrackingImage from "../../../../../../../3_Entity/SNS/useUnLikeTrackingImage";

const useToggleLikeTrackingImage = (trackingImageIdx) => {
  const [likeTrackingImage] = useLikeTrackingImage(trackingImageIdx);
  const [unlikeTrackingImage] = useUnLikeTrackingImage(trackingImageIdx);
  const [like, setLike] = React.useState(false);

  const toggleLikeTrackingImage = () => {
    !like ? likeTrackingImage() : unlikeTrackingImage();
    setLike(!like);
  };

  return [like, toggleLikeTrackingImage];
};

export default useToggleLikeTrackingImage;
