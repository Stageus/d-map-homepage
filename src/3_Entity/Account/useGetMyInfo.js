import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const useGetMyInfo = (oauthLoading) => {
  const [serverState, request, loading] = useFetch();
  const [userInfo, setUserInfo] = React.useState(null);

  React.useEffect(() => {
    if (!oauthLoading) {
      request("GET", `/account/me`, null);
    }
  }, [oauthLoading]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setUserInfo(serverState);
    }
  }, [serverState, loading]);

  return [userInfo, loading];
};

export default useGetMyInfo;
