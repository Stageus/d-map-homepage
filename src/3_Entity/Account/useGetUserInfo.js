import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { useNavigate } from "react-router-dom";

const useGetUserInfo = (userIdx) => {
  const [serverState, request, loading] = useFetch();
  const [userInfo, setUserInfo] = React.useState(null);
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    await request("GET", `/account/info/${userIdx}`, null);
  };

  React.useEffect(() => {
    fetchUserInfo();
  }, [userIdx]);

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 400:
          console.log("잘못된 요청입니다:", serverState.message);
          setUserInfo(null);
          break;
        case 404:
          console.log("사용자 정보를 찾을 수 없습니다.");
          setUserInfo(null);
          break;
        case 401:
          console.log("인증이 필요합니다.");
          navigate("/login");
          break;
        case 500:
          console.log("서버 오류 발생");
          break;
        default:
          setUserInfo(serverState);
      }
    }
  }, [loading, serverState]);

  return [userInfo, loading, fetchUserInfo];
};

export default useGetUserInfo;
