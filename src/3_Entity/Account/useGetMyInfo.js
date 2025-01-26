import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

const useGetMyInfo = () => {
  const [serverState, request, loading] = useFetch();
  const [userInfo, setUserInfo] = React.useState(null);

  React.useEffect(() => {
    request("GET", `/account/me`, null, TEST_TOKEN);
  }, []);

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
