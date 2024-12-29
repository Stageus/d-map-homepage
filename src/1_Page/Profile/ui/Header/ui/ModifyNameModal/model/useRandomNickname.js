import useGetRandomNicknames from "../api/useGetRandomNicknames";
import { useRef, useState } from "react";

const useRandomNickname = () => {
  const { nicknames, loading, error, getRandomNicknames } =
    useGetRandomNicknames();
  const [type, setType] = useState("현재");

  const nicknameRef = useRef(null);
  const [randState, setRandState] = useState(0);
  const handleType = async () => {
    nicknameRef.current.value = nicknames[randState];
    setType("추천된");
    setRandState((prev) => prev + 1);
    if (randState + 1 >= nicknames.length) {
      await getRandomNicknames();
      setRandState(0);
    }
  };
  return { type, nicknameRef, handleType };
};
export default useRandomNickname;
