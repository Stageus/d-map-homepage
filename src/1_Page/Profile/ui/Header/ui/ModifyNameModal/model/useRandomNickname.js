import useGetRandomNicknames from "../api/useGetRandomNicknames";
import { useState } from "react";

const useRandomNickname = (setValue) => {
  const { nicknames, loading, error, getRandomNicknames } =
    useGetRandomNicknames();
  const [type, setType] = useState("현재");

  const [randState, setRandState] = useState(0);
  const handleType = async () => {
    setValue("nickname", nicknames[randState]);
    setValue(nicknames[randState]);
    setType("추천된");
    setRandState((prev) => prev + 1);
    if (randState + 1 >= nicknames.length) {
      await getRandomNicknames();
      setRandState(0);
    }
  };
  return { type, handleType };
};
export default useRandomNickname;
