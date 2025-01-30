import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const usePutNickname = ({ onSuccess, onError }) => {
  const [serverState, request] = useFetch();

  const putNickname = async (nickname) => {
    await request("PUT", `/account/nickname`, { nickname });
  };

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState?.status) {
      case 400:
        onError?.("입력 값 오류: 닉네임 형식이 잘못되었습니다.");
        break;
      case 409:
        onError?.("중복 닉네임: 해당 닉네임은 이미 사용 중입니다.");
        break;
      default:
        onSuccess?.();
        break;
    }
  }, [serverState]);

  return [putNickname];
};

export default usePutNickname;
