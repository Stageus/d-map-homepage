import { useEffect, useState } from "react";

const useChangeTheme = (type) => {
  const [theme, setTheme] = useState(type === "다크" ? "다크" : "화이트");

  useEffect(() => {
    setTheme(type === "다크" ? "다크" : "화이트");
  }, [type]);

  return { theme };
};

export default useChangeTheme;
