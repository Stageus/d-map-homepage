import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const useGetUserInfo = (userIdx) => {
  const [serverState, request, loading] = useFetch();
  const [userInfo, setUserInfo] = React.useState(null);

  const fetchUserInfo = async () => {
    await request("GET", `/account/info/${userIdx}`, null);
  };

  React.useEffect(() => {
    fetchUserInfo();
  }, [userIdx]);

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      default:
        setUserInfo(serverState);
        break;
    }
  }, [serverState]);

  return [userInfo, loading, fetchUserInfo];
};

export default useGetUserInfo;
