import React from "react";
import STYLE from "./style";

const Loading = ({ message = "로딩 중입니다..." }) => {
  return (
    <STYLE.LoadingContainer>
      <STYLE.Spinner />
      <STYLE.LoadingMessage>{message}</STYLE.LoadingMessage>
    </STYLE.LoadingContainer>
  );
};

export default Loading;
