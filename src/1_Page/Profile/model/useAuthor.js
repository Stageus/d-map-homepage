import { useState } from "react";

const useAuthor = () => {
  const [author, setAuthor] = useState(true);

  const handleAuthorTrue = () => setAuthor(true);

  const handleAuthorFalse = () => setAuthor(false);

  return { author, handleAuthorTrue, handleAuthorFalse };
};

export default useAuthor;
