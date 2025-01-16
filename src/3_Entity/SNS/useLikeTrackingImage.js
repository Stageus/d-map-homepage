import React from "react";
import { fetchRequest } from "../../4_Shared/util/apiUtil";
const BASE_URL = process.env.REACT_APP_SERVER_URL;
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

const useLikeTrackingImage = (trackingImageIdx) => {
  const likeTrackingImage = async () => {
    try {
      const response = await fetchRequest(
        "POST",
        `${BASE_URL}/sns/like`,
        { tracking_idx: trackingImageIdx },
        TEST_TOKEN
      );
      const data = await response.json();
      switch (response.status) {
        case 200:
          break;
        case 400:
        case 401:
        case 403:
        case 404:
        case 429:
        case 500:
        default:
          console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [likeTrackingImage];
};
export default useLikeTrackingImage;
