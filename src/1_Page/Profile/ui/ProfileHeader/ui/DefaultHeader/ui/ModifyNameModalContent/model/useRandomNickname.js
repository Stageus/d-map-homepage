import { useState, useCallback, useEffect, useRef } from "react";

const useRandomNickname = (nicknames, loading, setPage) => {
  const [typeText, setTypeText] = useState("현재");
  const randStateRef = useRef(0); // 닉네임 인덱스 추적

  // 닉네임 리스트가 바뀔 때마다 인덱스 초기화
  useEffect(() => {
    randStateRef.current = 0;
  }, [nicknames]);

  // 닉네임 가져오기
  const handleNextNickname = useCallback(
    (setValue) => {
      if (loading || nicknames.length === 0) return;

      // 현재 인덱스의 닉네임 적용
      setValue("nickname", nicknames[randStateRef.current]);
      setTypeText("추천된");

      const nextIndex = randStateRef.current + 1;
      if (nextIndex >= nicknames.length) {
        setPage((prevPage) => prevPage + 1); // 새로운 닉네임 요청
        randStateRef.current = 0; // 페이지 변경 시 인덱스 초기화
      } else {
        randStateRef.current = nextIndex;
      }
    },
    [nicknames, loading]
  );

  return { typeText, handleNextNickname, loading };
};

export default useRandomNickname;
