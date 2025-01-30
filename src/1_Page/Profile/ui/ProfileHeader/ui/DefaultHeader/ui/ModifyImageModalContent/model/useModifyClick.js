import { useEffect, useRef } from "react";

const useModifyClick = ({
  image,
  errorMessage,
  imagePreviewURL,
  setMessage,
  confirmModalToggle,
}) => {
  const imageRef = useRef(image);

  useEffect(() => {
    imageRef.current = image;
  }, [image]);

  const validateImageChange = () => {
    if (errorMessage) {
      setMessage(errorMessage);
      confirmModalToggle();
      return false;
    }
    if (imageRef.current === imagePreviewURL) {
      setMessage("사진을 변경하세요");
      confirmModalToggle();
      return false;
    }
    return true;
  };

  return { validateImageChange };
};

export default useModifyClick;
