import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const useDeleteTrackingImage = (idxList) => {
  const [serverState, request] = useFetch();

  const deleteTrackingImage = async () => {
    await request("DELETE", `/tracking`, { idxList });
  };

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 200:
        console.log("삭제");
        return;
      case 403:
        console.log(serverState.message);
        break;
      case 429:
        alert("요청이 너무 많습니다! 잠시 기다려주세요.");
        break;
      default:
        break;
    }
  }, [serverState]);

  return [deleteTrackingImage];
};

export default useDeleteTrackingImage;
