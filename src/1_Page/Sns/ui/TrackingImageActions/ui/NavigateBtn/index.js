import React from "react";
import STYLE from "./style";
import { useNavigate } from "react-router-dom";
import open_in_tracking_page_icon from "../../assets/openInTrackingPage.svg";
const NavigateBtn = () => {
  const navigate = useNavigate();
  return (
    <>
      <STYLE.Button
        onClick={() => {
          navigate("/tracking");
        }}
      >
        <img src={open_in_tracking_page_icon} alt="open on tracking page" />
      </STYLE.Button>
    </>
  );
};

export default NavigateBtn;
