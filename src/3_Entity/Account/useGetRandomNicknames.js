import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const useGetRandomNicknames = (page) => {
  const [serverState, request, loading] = useFetch();
  const [nicknames, setNicknames] = React.useState([]);

  React.useEffect(() => {
    request("GET", `/account/nickname`, null, null);
  }, [page]);

  React.useEffect(() => {
    if (!loading && serverState) {
      if (serverState.ok) {
        setNicknames(serverState.nickname || []);
      } else {
        const errorMessages = {
          500: "서버 내부 오류가 발생했습니다.",
        };

        const message =
          errorMessages[serverState.status] ||
          "알 수 없는 오류가 발생했습니다.";
        console.error(`Error ${serverState.status}: ${message}`);
      }
    }
  }, [loading, serverState]);

  return [nicknames, loading];
};

export default useGetRandomNicknames;
