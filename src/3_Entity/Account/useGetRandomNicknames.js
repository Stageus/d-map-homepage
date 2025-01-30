import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const useGetRandomNicknames = (page) => {
  const [serverState, request, loading] = useFetch();
  const [nicknames, setNicknames] = React.useState([]);

  React.useEffect(() => {
    request("GET", `/account/nickname`, null, null);
  }, [page]);

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      default:
        setNicknames(serverState.nickname || []);
        break;
    }
  }, [serverState]);

  return [nicknames, loading];
};

export default useGetRandomNicknames;
