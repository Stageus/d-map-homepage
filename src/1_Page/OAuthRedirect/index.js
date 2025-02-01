import { useNavigate } from "react-router-dom";
import React from "react";
import { useCookies } from "react-cookie";
import useLoginWithKakao from "../../3_Entity/Account/useLoginWithKakao";
import useGetMyInfo from "../../3_Entity/Account/useGetMyInfo";
const OAuthRedirect = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies([
    "accessToken",
    "refreshToken",
    "userIdx",
  ]);
  const queryParams = new URLSearchParams(window.location.search);
  const [kakaoLoading] = useLoginWithKakao(
    queryParams.get("code"),
    queryParams.get("state")
  );
  const [userinfo] = useGetMyInfo(kakaoLoading);

  React.useEffect(() => {
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 30);
    if (!kakaoLoading && userinfo) {
      setCookies("userIdx", userinfo.idx, { path: "/", expires });
      navigate("/");
    }
  }, [kakaoLoading, userinfo]);

  return <div>Authenticating...</div>;
};

export default OAuthRedirect;
