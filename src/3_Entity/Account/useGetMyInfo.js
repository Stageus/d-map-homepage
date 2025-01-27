import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const useGetMyInfo = (userIdx = "me") => {
  const [serverState, request, loading] = useFetch();
  const [userInfo, setUserInfo] = React.useState(null);

  React.useEffect(() => {
    console.log("me 호출");
    if (userIdx !== "me") return;
    request("GET", `/account/me`, null);
  }, [userIdx]);

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 400:
          console.log(serverState.message);
          break;
        default:
          break;
      }
    }
    setUserInfo(serverState);
  }, [loading, serverState]);

  return [userInfo, loading];
};

export default useGetMyInfo;
