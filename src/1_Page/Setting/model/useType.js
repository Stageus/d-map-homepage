import { useState } from "react";

const useType = () => {
  const [type, setType] = useState(null);

  const message = (() => {
    switch (type) {
      case "탈퇴":
        return "탈퇴 하시겠습니까?";
      case "로그아웃":
        return "로그아웃 하시겠습니까?";
      default:
        return null;
    }
  })();

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
