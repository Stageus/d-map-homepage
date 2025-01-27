import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const usePutNickname = () => {
  const [serverState, request, loading] = useFetch();

  const putNickname = async (nickname) => {
    await request("PUT", `/account/nickname`, { nickname });
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      const errorMessages = {
        400: "입력 값 오류: 닉네임 형식이 잘못되었습니다.",
        401: "인증 실패: 다시 로그인 하십시오.",
        403: "인증 실패: 다시 로그인 하십시오.",
        404: "잘못된 접근: 없는 아이디입니다.",
        409: "중복 닉네임: 해당 닉네임은 이미 사용 중입니다.",
      };
      const message =
        errorMessages[serverState.status] || "서버 오류가 발생했습니다.";
      console.error(`Error ${serverState.status}: ${message}`);
    }
  }, [loading, serverState]);

  return [putNickname];
};

export default usePutNickname;
