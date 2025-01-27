import React from "react";

import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

export const useFormDataFetch = () => {
  const [serverState, setServerState] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const request = async (method, endPoint, formData = null) => {
    try {
      const config = {
        method: method,
        headers: {
          Authorization: TEST_TOKEN, // 인증 토큰 추가
        },
        body: formData,
      };

      const response = await fetch(`${BASE_URL}${endPoint}`, config);

      if (!response.ok) {
        throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
      }

      const data = await response.json();
      setServerState({ ...data, status: response.status });
    } catch (error) {
      console.error("FormData 요청 오류:", error);
      setServerState({ error: error.message, status: "error" });
    } finally {
      setLoading(false);
    }
  };

  return [serverState, request, loading];
};

const usePutProfileImage = () => {
  const [serverState, request, loading] = useFormDataFetch();

  const putProfileImage = async ({ imageFile }) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      await request("PUT", "/account/image", formData);
      if (serverState?.status && serverState.status !== 200) {
        const errorMessages = {
          400: "입력 값 오류: 닉네임 형식이 잘못되었습니다.",
          401: "인증 실패: 다시 로그인 하십시오.",
          403: "접근 권한이 없습니다.",
          404: "잘못된 접근: 없는 아이디입니다.",
          409: "중복 닉네임: 해당 닉네임은 이미 사용 중입니다.",
        };
        return;
      }

      console.log("이미지 업로드 성공:", serverState);
      return serverState;
    } catch (error) {
      console.error("프로필 이미지 업로드 오류:", error);
    }
  };

  return [putProfileImage, loading];
};

export default usePutProfileImage;
