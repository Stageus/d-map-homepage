import STYLE from "./style";
import React from "react";
import { useNavigate } from "react-router-dom";
import home_icon from "./assets/home.svg";
import search_icon from "./assets/magnifying-glass-solid.svg";
import map_icon from "./assets/map.svg";
import profile_icon from "./assets/user.svg";
import setting_icon from "./assets/setting.svg";
import PAGE from "./constant/page";

const Footer = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(PAGE.HOME);
  return (
    <STYLE.Container>
      <STYLE.Tab $isCurrentPage={page === PAGE.HOME}>
        <img
          src={home_icon}
          alt="home"
          onClick={() => {
            setPage(PAGE.HOME);
            navigate("/");
          }}
        />
      </STYLE.Tab>
      <STYLE.Tab $isCurrentPage={page === PAGE.SEARCH}>
        <img
          src={search_icon}
          alt="search"
          onClick={() => {
            setPage(PAGE.SEARCH);
            navigate("/search");
          }}
        />
      </STYLE.Tab>
      <STYLE.Tab $isCurrentPage={page === PAGE.TRACKING}>
        <img
          src={map_icon}
          alt="map"
          onClick={() => {
            setPage(PAGE.TRACKING);
            navigate("/tracking");
          }}
        />
      </STYLE.Tab>
      <STYLE.Tab $isCurrentPage={page === PAGE.PROFILE}>
        <img
          src={profile_icon}
          alt="profile"
          onClick={() => {
            setPage(PAGE.PROFILE);
            navigate("/profile/:userIdx");
          }}
        />
      </STYLE.Tab>
      <STYLE.Tab $isCurrentPage={page === PAGE.SETTING}>
        <img
          src={setting_icon}
          alt="setting"
          onClick={() => {
            setPage(PAGE.SETTING);
            navigate("/setting");
          }}
        />
      </STYLE.Tab>
    </STYLE.Container>
  );
};

export default Footer;
