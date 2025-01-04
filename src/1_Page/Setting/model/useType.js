import { useState, useEffect } from "react";

const useType = () => {
  const [type, setType] = useState(null);

  const [message, setMessage] = useState(null);

  useEffect(() => {
    type === "탈퇴"
      ? setMessage("탈퇴 하시겠습니까?")
      : setMessage("로그아웃 하시겠습니까?");
    console.log(message);
  }, [type]);

  const handleSetDelete = () => setType("탈퇴");
  const handleSetLogout = () => setType("로그아웃");

  return {
    type,
    message,
    handleSetDelete,
    handleSetLogout,
  };
};

export default useType;
