import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const useGetMyInfo = () => {
  const [serverState, request, loading] = useFetch();
  const [userInfo, setUserInfo] = React.useState(null);

  React.useEffect(() => {
    request("GET", `/account/me`, null);
  }, []);

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      default:
        setUserInfo(serverState);
        break;
    }
  }, [serverState]);

  return [userInfo, loading];
};

export default useGetMyInfo;
