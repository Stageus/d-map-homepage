import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const useGetUserInfo = (userIdx) => {
  const [serverState, request, loading] = useFetch();
  const [userInfo, setUserInfo] = React.useState(null);

  const isValidInteger = (value) => {
    return (
      typeof value === "string" &&
      value.trim() !== "" &&
      Number.isInteger(Number(value))
    );
  };

  React.useEffect(() => {
    console.log("another 호출");
    if (!isValidInteger(userIdx)) return;
    request("GET", `/account/info/${userIdx}`, null);
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

export default useGetUserInfo;
