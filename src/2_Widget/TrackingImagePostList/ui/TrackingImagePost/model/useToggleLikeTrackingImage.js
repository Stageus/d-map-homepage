import React from "react";
import postLikeTrackingImage from "../../../../../3_Entity/SNS/postLikeTrackingImage";
import deleteLikeTrackingImage from "../../../../../3_Entity/SNS/deleteLikeTrackingImage";

const useToggleLikeTrackingImage = (trackingImageIdx, liked_by_user) => {
  const [like, setLike] = React.useState(false);
  React.useEffect(() => {
    setLike(liked_by_user);
  }, [liked_by_user]);

  const toggleLikeTrackingImage = () => {
    !like
      ? postLikeTrackingImage(trackingImageIdx)
      : deleteLikeTrackingImage(trackingImageIdx);
    setLike(!like);
  };

  return [like, toggleLikeTrackingImage];
};

export default useToggleLikeTrackingImage;
