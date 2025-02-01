import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const useGetNaverAuthUrl = () => {
  const [serverState, request, loading] = useFetch();
  const [url, setUrl] = React.useState("");

  React.useEffect(() => {
    request("GET", `/account/login/url/naver`, null);
  }, []);

  React.useEffect(() => {
    if(!loading && serverState){
      setUrl(serverState.url)
    }
  }, [serverState, loading]);

  return [url, loading];
};

export default useGetNaverAuthUrl;
