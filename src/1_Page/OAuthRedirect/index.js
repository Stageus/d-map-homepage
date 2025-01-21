import { useNavigate } from "react-router-dom";
import React from "react";

const OAuthRedirect = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // 현재 URL에서 쿼리 파라미터 추출
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    const state = queryParams.get("state");
    console.log(`code:${code}, state:${state}`)
    navigate("/")
  }, [navigate]);

  return <div>Authenticating...</div>;
};

export default OAuthRedirect;
