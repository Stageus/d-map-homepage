import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

const usePutProfileImage = (imageFile) => {
  const [serverState, request, loading] = useFetch();

  const putProfileImage = async () => {
    const formData = new FormData();
    formData.append("image", imageFile);

    await request(
      "PUT",
      `/account/image`,
      formData,
      TEST_TOKEN,
      false // FormData 전송 시 헤더 자동 설정
    );
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      if (!serverState.ok) {
        const errorMessages = {
          400: "입력 값 오류: 이미지 파일이 올바르지 않습니다.",
          401: "인증 실패: 토큰이 유효하지 않습니다.",
          413: "파일 크기 초과: 허용된 크기를 초과했습니다.",
        };

        const message =
          errorMessages[serverState.status] || "서버 오류가 발생했습니다.";
        console.error(`Error ${serverState.status}: ${message}`);
      }
    }
  }, [loading, serverState]);

  return [putProfileImage];
};

export default usePutProfileImage;
