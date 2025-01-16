import React from "react";
import useLikeTrackingImage from "../../../../../3_Entity/SNS/useLikeTrackingImage";
import useUnLikeTrackingImage from "../../../../../3_Entity/SNS/useUnLikeTrackingImage";

const useToggleLikeTrackingImage = (trackingImageIdx, liked_by_user) => {
  const [likeTrackingImage] = useLikeTrackingImage(trackingImageIdx);
  const [unlikeTrackingImage] = useUnLikeTrackingImage(trackingImageIdx);
  const [like, setLike] = React.useState(liked_by_user);

  const toggleLikeTrackingImage = () => {
    !like ? likeTrackingImage() : unlikeTrackingImage();
    setLike(!like);
  };

  return [like, toggleLikeTrackingImage];
};

export default useToggleLikeTrackingImage;
