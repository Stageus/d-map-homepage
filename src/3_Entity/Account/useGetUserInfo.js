import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

const useGetUserInfo = (userIdx) => {
  const [serverState, request, loading] = useFetch();

  const getUserInfo = async () => {
    if (!userIdx) {
      console.error("유효하지 않은 사용자 ID입니다.");
      return;
    }

    await request("GET", `/account/info/${userIdx}`, null, TEST_TOKEN);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      if (!serverState.ok) {
        console.error(`서버 오류: ${serverState.message || "알 수 없는 오류"}`);
      }
    }
  }, [loading, serverState]);

  return [getUserInfo, serverState, loading];
};

export default useGetUserInfo;
