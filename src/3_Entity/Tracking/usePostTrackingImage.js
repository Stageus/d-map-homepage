import searchpointConverter from "../../4_Shared/lib/searchpointConverter";
import { useFetch } from "../../4_Shared/util/apiUtil";
import React from "react";

const usePostTrackingImage = () => {
  const [serverState, request, loading] = useFetch();

  const postTrackingImage = async (trackingData) => {
    if (trackingData.line.length <= 0) {
      alert("트래킹 데이터가 없습니다!");
      return;
    }
    const searchpoint = await searchpointConverter(trackingData.center);
    request("POST", `/tracking`, {
      line: trackingData?.line,
      searchpoint,
      center: trackingData?.center,
      zoom: trackingData?.zoom,
      heading: trackingData?.heading,
      sharing: trackingData?.sharing,
      color: trackingData?.color,
      thickness: trackingData?.thickness,
      background: trackingData?.background,
    });
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
          console.log(serverState.message);
          break;
      }
    }
  }, [loading, serverState]);

  return [postTrackingImage]
};
export default usePostTrackingImage;
