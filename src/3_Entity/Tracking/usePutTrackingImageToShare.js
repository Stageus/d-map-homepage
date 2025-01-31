import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const usePutTrackingImageToShare = (idxList) => {
  const [serverState, request] = useFetch();

  const putTrackingImageToShare = () => {
    request("PUT", `/tracking/toSharing`, { idxList });
  };

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 400:
        console.log("idx 오류 , access token 양식 오류");
        break;
      default:
        break;
    }
  }, [serverState]);

  return [putTrackingImageToShare];
};

export default usePutTrackingImageToShare;
