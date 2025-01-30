import React from "react";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
const TEST_TOKEN = process.env.REACT_APP_TESTING_ACCESS_TOKEN;

export const useFormDataFetch = () => {
  const [serverState, setServerState] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const request = async (method, endPoint, body = null) => {
    try {
      const config = {
        method: method,
        headers: {
          Authorization: TEST_TOKEN,
        },
        body: body,
      };
      console.log("EX2");
      const response = await fetch(`${BASE_URL}${endPoint}`, config);
      console.log("EX");
      const data = await response.json();
      setServerState({ ...data, status: response.status });
    } catch (error) {
      console.log("FormData 요청 오류:", error);
    } finally {
      console.log("실행");
      setLoading(false);
    }
  };
  return [serverState, request, loading];
};

const usePutProfileImage = ({ onSuccess, onError }) => {
  const [serverState, request] = useFormDataFetch();

  const putProfileImage = (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    request("PUT", "/account/image", formData);
  };

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState?.status) {
      case 400:
        onError?.(
          "유효하지 않은 파일 형식입니다. jpg,png,gif 파일만 허용됩니다."
        );
        break;
      case 413:
        onError?.("파일 크기는 최대 5MB까지만 허용됩니다.");
        break;
      default:
        onSuccess?.();
        break;
    }
  }, [serverState]);

  return [putProfileImage];
};

export default usePutProfileImage;
