// 로그인 버튼 컴포넌트
import React from "react";
import STYLE from "./style";
const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;

const Login = () => {
  const STATE = crypto.randomUUID();
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${NAVER_REDIRECT_URI}`;

  const NaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return (
    <STYLE.LoginPageContainer>
      <p>
        DMAP - Draw Your Own Map!!!
      </p>
      <STYLE.LoginBtnContainer>
        <STYLE.LoginBtn onClick={NaverLogin}>Naver로 로그인</STYLE.LoginBtn>
        <STYLE.LoginBtn onClick={NaverLogin}>Naver로 로그인</STYLE.LoginBtn>
        <STYLE.LoginBtn onClick={NaverLogin}>Naver로 로그인</STYLE.LoginBtn>
      </STYLE.LoginBtnContainer>
    </STYLE.LoginPageContainer>
  );
};

export default Login;
