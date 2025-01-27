import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const usePutNickname = (onProfileNicknameChange) => {
  const [serverState, request, loading] = useFetch();

  const putNickname = async (nickname) => {
    await request("PUT", `/account/nickname`, { nickname });
  };

  React.useEffect(() => {
    switch (serverState?.status) {
      case 400:
        console.log("입력 값 오류: 닉네임 형식이 잘못되었습니다.");
        return;
      case 403:
        console.log("인증 실패: 다시 로그인 하십시오");
        return;
      case 409:
        console.log("중복 닉네임: 해당 닉네임은 이미 사용 중입니다.");
        return;
      case 200:
        onProfileNicknameChange();
        break;
      default:
        console.log(serverState.message);
    }
  }, [serverState]);

  return [putNickname];
};

export default usePutNickname;
