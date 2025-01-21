import { useEffect, useState } from "react";

const useChangeTheme = (type) => {
  const [theme, setTheme] = useState(type === "다크" ? "다크" : "화이트");

  useEffect(() => {
    setTheme(type === "다크" ? "다크" : "화이트");
    console.log(`테마 변경 ${theme}`);
  }, [type]);
};

export default useChangeTheme;
