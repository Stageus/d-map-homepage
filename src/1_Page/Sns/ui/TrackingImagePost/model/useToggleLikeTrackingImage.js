import React from "react";
import usePostLikeTrackingImage from "../../../../../3_Entity/SNS/usePostLikeTrackingImage";
import useDeleteLikeTrackingImage from "../../../../../3_Entity/SNS/useDeleteLikeTrackingImage";

const useToggleLikeTrackingImage = (trackingImageIdx, liked_by_user) => {
  const [postLikeTrackingImage] = usePostLikeTrackingImage(trackingImageIdx);
  const [deleteLikeTrackingImage] = useDeleteLikeTrackingImage(trackingImageIdx);
  const [like, setLike] = React.useState(liked_by_user);

  const toggleLikeTrackingImage = () => {
    !like ? postLikeTrackingImage() : deleteLikeTrackingImage();
    setLike(!like);
  };

  return [like, toggleLikeTrackingImage];
};

export default useToggleLikeTrackingImage;
