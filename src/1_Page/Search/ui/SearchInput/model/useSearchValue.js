import { useState } from "react";

const useSearchValue = () => {
  const [inputValue, setInputValue] = useState(""); // 입력값 관리
  const [isError, setIsError] = useState(false); // 에러 상태
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지

  // 정규식: 2~100글자, 영문/한글/숫자/특수문자 ','만 허용
  const regex = /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ0-9,]{2,100}$/;

  const handleSearch = () => {
    if (!inputValue.trim()) {
      setIsError(true);
      setErrorMessage("값을 입력해주세요.");
      return;
    }

    if (!regex.test(inputValue)) {
      setIsError(true);
      setErrorMessage(
        "2~100글자, 영문/한글/숫자/특수문자 ','만 입력 가능합니다."
      );
    } else {
      setIsError(false);
      setErrorMessage("");
      // 유효한 입력 처리 (추가 동작)
      console.log("검색 실행:", inputValue);
    }
  };
  return { isError, inputValue, errorMessage, handleSearch, setInputValue };
};
export default useSearchValue;
