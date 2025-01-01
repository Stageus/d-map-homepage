import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSearchValue = () => {
  const [inputValue, setInputValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // 정규식: 2~100글자, 영문/한글/숫자/특수문자 ','만 허용
  const regex = /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9,]{2,100}$/;

  // 입력값 검증 함수
  const validateInput = () => {
    if (!inputValue.trim()) {
      setIsError(true);
      setErrorMessage("값을 입력해주세요.");
      return false;
    }

    if (!regex.test(inputValue)) {
      setIsError(true);
      setErrorMessage(
        "2~100글자, 영문/한글/숫자/특수문자 ','만 입력 가능합니다."
      );
      return false;
    }

    setIsError(false);
    setErrorMessage("");
    return true; // 유효한 입력
  };

  // 엔터키 핸들러
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigateToSearch();
    }
  };

  const navigateToSearch = () => {
    if (validateInput()) {
      navigate(`/search?text=${encodeURIComponent(inputValue)}`);
    }
  };

  return {
    isError,
    inputValue,
    errorMessage,
    navigateToSearch,
    handleKeyDown,
    setInputValue,
  };
};

export default useSearchValue;
