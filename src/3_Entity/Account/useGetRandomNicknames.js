import React, { useEffect } from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const useGetRandomNicknames = (page) => {
  const [serverState, request, loading] = useFetch();
  const [nicknames, setNicknames] = React.useState([]);

  useEffect(() => {
    console.log(nicknames);
  }, [nicknames]);

  React.useEffect(() => {
    request("GET", `/account/nickname`, null, null);
  }, [page]);

  React.useEffect(() => {
    console.log(serverState);
    if (!loading && serverState) {
      setNicknames(serverState.nickname || []);
    }
  }, [loading, serverState]);

  return [nicknames, loading];
};

export default useGetRandomNicknames;
