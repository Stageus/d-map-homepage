const BASE_URL = process.env.REACT_APP_SERVER_URL;
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

const usePutProfileImage = () => {
  const putProfileImage = async (imageFile) => {
    const body = new FormData();
    body.append("image", imageFile);
    const endPoint = "/account/image";
    const config = {
      method: "PUT",
      headers: {},
    };
    if (true) {
      config.headers.Authorization = TEST_TOKEN;
    }
    if (body !== null) {
      config.body = body;
    }
    const response = await fetch(`${BASE_URL}${endPoint}`, config);
    // 서버 응답 상태 확인
    if (!response.ok) {
      const errorMessages = {
        400: "입력 값 오류: 닉네임 형식이 잘못되었습니다.",
        401: "인증 실패: 다시 로그인 하십시오.",
        403: "인증 실패: 다시 로그인 하십시오.",
        404: "잘못된 접근: 없는 아이디입니다.",
        409: "중복 닉네임: 해당 닉네임은 이미 사용 중입니다.",
      };
      const message =
        errorMessages[response.status] || "서버 오류가 발생했습니다.";
      console.log(message);
    }

    const data = await response.json();
    console.log("이미지 업로드 성공:", data);

    return data; // 성공 시 데이터 반환
  };

  return [putProfileImage];
};

export default usePutProfileImage;
