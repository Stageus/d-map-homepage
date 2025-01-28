import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const usePutTrackingImageToShare = ({ onSucess, onError }) => {
  const [serverState, request] = useFetch();

  const putTrackingImageToShare = (idxList) => {
    request("PUT", `/tracking/toSharing`, { idxList });
  };

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 200:
        onSucess?.();
        return;
      case 400:
        console.error("입력 값 오류");
        break;
      case 401:
        console.error("인증 실패");
        break;
      case 404:
        console.error("리소스를 찾을 수 없습니다");
        break;
      case 409:
        console.error("충돌 발생");
        break;
      case 500:
        console.error("서버 연결 실패");
        break;
      default:
        if (!serverState.ok) {
          console.error(`서버 오류 발생: 상태 코드 ${serverState.status}`);
        }
        break;
    }
  }, [serverState]);

  return [putTrackingImageToShare];
};

export default usePutTrackingImageToShare;
