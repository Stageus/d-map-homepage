import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const usePutTrackingImageToNotShare = () => {
  const [serverState, request] = useFetch();

  const putTrackingImageToNotShare = (idxList) => {
    request("PUT", `/tracking/toNotSharing`, { idxList });
  };

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 200:
        return;
      case 403:
        console.log(serverState.message);
        break;

      case 429:
        break;
      default:
        break;
    }
  }, [serverState]);

  return [putTrackingImageToNotShare];
};

export default usePutTrackingImageToNotShare;
