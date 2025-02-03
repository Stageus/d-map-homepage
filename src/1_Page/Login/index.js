// 로그인 버튼 컴포넌트
import React from "react";
import STYLE from "./style";
import useGetNaverAuthUrl from "../../3_Entity/Account/useGetNaverAuthUrl";
import useGetKakaoAuthUrl from "../../3_Entity/Account/useGetKakaoAuthUrl";

const Login = () => {
  const [naverAuthUrl] = useGetNaverAuthUrl();
  const [kakaoAuthUrl] = useGetKakaoAuthUrl();
  const params = new URLSearchParams(kakaoAuthUrl.split('?')[1]);
  const state = params.get('state');
  console.log(state)
  const redirect = "http://localhost:3000/auth/callback";
  const cliendtId = "f565bec2199ab0f3f02d9ba17941ed52";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${cliendtId}&redirect_uri=${redirect}&state=${state}`

  return (
    <STYLE.LoginPageContainer>
      <p>DMAP - Draw Your Own Map!!!</p>
      <STYLE.LoginBtnContainer>
        <STYLE.LoginBtn
          onClick={() => {
            window.location.href = naverAuthUrl;
          }}
        >
          Naver로 로그인
        </STYLE.LoginBtn>
        <STYLE.LoginBtn
          onClick={() => {
            window.location.href = KAKAO_AUTH_URL;
          }}
        >
          Kakao로 로그인
        </STYLE.LoginBtn>
      </STYLE.LoginBtnContainer>
    </STYLE.LoginPageContainer>
  );
};

export default Login;
