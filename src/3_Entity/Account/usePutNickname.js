import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const usePutNickname = ({ onSuccess, onError }) => {
  const [serverState, request, loading] = useFetch();

  const putNickname = async (nickname) => {
    await request("PUT", `/account/nickname`, { nickname });
  };

  React.useEffect(() => {
    let message;
    if (!serverState) return;
    switch (serverState?.status) {
      case 200:
        onSuccess?.();
        return;
      case 400:
        message = "입력 값 오류: 닉네임 형식이 잘못되었습니다.";
        break;
      case 403:
        message("인증 실패: 다시 로그인 하십시오");
        break;
      case 409:
        message = "중복 닉네임: 해당 닉네임은 이미 사용 중입니다.";
        break;
      default:
        message = serverState?.message;
        break;
    }
    onError?.(message);
  }, [serverState]);

  return [putNickname];
};

export default usePutNickname;
