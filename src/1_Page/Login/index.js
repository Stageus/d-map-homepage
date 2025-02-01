// 로그인 버튼 컴포넌트
import React from "react";
import STYLE from "./style";
import useGetNaverAuthUrl from "../../3_Entity/Account/useGetNaverAuthUrl";
import useGetKakaoAuthUrl from "../../3_Entity/Account/useGetKakaoAuthUrl";

const Login = () => {
  const [naverAuthUrl] = useGetNaverAuthUrl();
  const [kakaoAuthUrl] = useGetKakaoAuthUrl();


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
            window.location.href = kakaoAuthUrl;
          }}
        >
          Kakao로 로그인
        </STYLE.LoginBtn>
      </STYLE.LoginBtnContainer>
    </STYLE.LoginPageContainer>
  );
};

export default Login;
