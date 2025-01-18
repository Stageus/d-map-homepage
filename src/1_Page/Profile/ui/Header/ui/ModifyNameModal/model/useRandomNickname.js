import { useState, useCallback, useEffect, useRef } from "react";
import getRandomNicknames from "../../../../../../../3_Entity/Account/getRandomNickname";

const useRandomNickname = () => {
  const [nicknames, setNicknames] = useState([]);
  const [typeText, setTypeText] = useState("현재");
  const [randState, setRandState] = useState(0);
  const randStateRef = useRef(0); // randState의 최신 상태를 추적

  // 닉네임 목록을 가져오는 함수
  const fetchNicknames = useCallback(async () => {
    const randNicknames = await getRandomNicknames();
    setNicknames(randNicknames);
    setRandState(0);
  }, []);

  useEffect(() => {
    fetchNicknames();
  }, [fetchNicknames]);
  const handleNextNickname = useCallback(
    (setValue) => {
      if (nicknames.length === 0) return;
      const nextIndex = randStateRef.current + 1;
      setValue("nickname", nicknames[randStateRef.current]);
      setTypeText("추천된");

      if (nextIndex >= nicknames.length) {
        fetchNicknames();
        randStateRef.current = 0;
        setRandState(0);
      } else {
        randStateRef.current = nextIndex;
        setRandState(nextIndex);
      }
    },
    [nicknames, fetchNicknames]
  );

  return { typeText, handleNextNickname };
};

export default useRandomNickname;
