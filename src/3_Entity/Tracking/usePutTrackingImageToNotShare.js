import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

const usePutTrackingImageToNotShare = () => {
  const [serverState, request, loading] = useFetch();

  const putTrackingImageToNotShare = (idxList) => {
    request("PUT", `/tracking/toNotSharing`, { idxList }, TEST_TOKEN);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 403:
          console.log(serverState.message);
          break;
        case 429:
          alert("요청이 너무 많습니다! 잠시 기다려주세요.");
          break;
        default:
          break;
      }
    }
  }, [loading, serverState]);

  return [putTrackingImageToNotShare];
};

export default usePutTrackingImageToNotShare;
