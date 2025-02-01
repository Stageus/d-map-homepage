import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { useCookies } from "react-cookie";

const useLoginWithKakao = (code, state) => {
  const [serverState, request, loading] = useFetch();
  const [accessToken, setAccessToken] = React.useState("");
  const [refreshToken, setRefreshToken] = React.useState("")
  const [cookies, setCookies] = useCookies(["accessToken", "refreshToken"]);

  React.useEffect(() => {
    request("GET", `/account/login/token/kakao`, {code, state});
  }, [code, state]);

  React.useEffect(() => {
    if(!loading && serverState){
      
      setAccessToken(serverState.token.access_token)
      setRefreshToken(serverState.token.refresh_token)

      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 30);
      setCookies("accessToken", accessToken, { path: "/", expires });
      setCookies("refreshToken", refreshToken, { path: "/" });
    }
  }, [serverState, loading]);

  return [loading];
};

export default useLoginWithKakao;
