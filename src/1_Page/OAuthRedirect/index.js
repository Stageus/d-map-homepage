import { useNavigate } from "react-router-dom";
import React from "react";
import { useCookies } from "react-cookie";
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

const OAuthRedirect = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken'])

  React.useEffect(() => {
    // 현재 URL에서 쿼리 파라미터 추출
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    const state = queryParams.get("state");
    console.log(`code:${code}, state:${state}`);

    setCookies('accessToken', TEST_TOKEN, {path: "/"})
    setCookies('refreshToken', TEST_TOKEN, {path: "/"})
    navigate("/");
  }, [navigate]);

  return <div>Authenticating...</div>;
};

export default OAuthRedirect;
