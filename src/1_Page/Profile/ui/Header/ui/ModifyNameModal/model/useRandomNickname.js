import { useState, useCallback, useEffect } from "react";
import getRandomNicknames from "../../../../../../../3_Entity/Account/getRandomNickname";

const useRandomNickname = () => {
  const [nicknames, setNicknames] = useState([]);
  const [type, setType] = useState("현재");
  const [randState, setRandState] = useState(0);

  // 닉네임 목록을 가져오는 함수
  const fetchNicknames = useCallback(async () => {
    const randNicknames = await getRandomNicknames();
    setNicknames(randNicknames);
    setRandState(0);
  }, []);

  fetchNicknames();

  const handleType = async (setValue) => {
    if (nicknames.length === 0) return;

    setValue("nickname", nicknames[randState]);
    setType("추천된");

    setRandState((prev) => {
      const nextIndex = prev + 1;

      if (nextIndex >= nicknames.length) {
        fetchNicknames();
        return 0;
      }
      return nextIndex;
    });
  };

  return { type, handleType };
};

export default useRandomNickname;
