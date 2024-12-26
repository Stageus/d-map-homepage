import React from "react";
import STYLE from "./style";
import detail_icon from "../../assets/detail.svg";
const DetailModalBtn = (props) => {
  const {clickEvent} = props;
  return (
    <>
      <STYLE.Button onClick={()=>{clickEvent()}}>
        <STYLE.Icon src={detail_icon} alt="go detail" />
      </STYLE.Button>
    </>
  );
};

export default DetailModalBtn;
