import React from "react";
import STYLE from "./style";
const EventBtn = (props) => {
  const {clickEvent , icon} = props;
  return (
    <>
      <STYLE.Button onClick={()=>{clickEvent()}}>
        <STYLE.IconImg src={icon} alt="event btn" />
      </STYLE.Button>
    </>
  );
};

export default EventBtn;
