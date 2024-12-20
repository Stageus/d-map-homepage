import React from "react";
import STYLE from "./style";

const HeaderSetting = (props) => {
  const { modifyMode, handleCloseMode } = props;
  return (
    <STYLE.Container>
      <STYLE.Title>{modifyMode} 설정</STYLE.Title>
      <STYLE.ButtonWrapper>
        <STYLE.Button $primary>완료</STYLE.Button>
        <STYLE.Button onClick={handleCloseMode}>취소</STYLE.Button>
      </STYLE.ButtonWrapper>
    </STYLE.Container>
  );
};

export default HeaderSetting;
