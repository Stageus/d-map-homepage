import STYLE from "./style";
import React from "react";
import { useNavigate } from "react-router-dom";
import home_icon from "./assets/home.svg";
import search_icon from "./assets/magnifying-glass-solid.svg";
import map_icon from "./assets/map.svg";
import profile_icon from "./assets/user.svg";
import setting_icon from "./assets/setting.svg";
import PAGE from "./constant/page";
import useAuthenticator from "../../../4_Shared/lib/useAuthenticator";

const Footer = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(
    window.location.pathname.split("/")[1] || PAGE.HOME
  );
  const [isLogin] = useAuthenticator();
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
        <STYLE.TabInfoTitle>HOME</STYLE.TabInfoTitle>
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
        <STYLE.TabInfoTitle>SEARCH</STYLE.TabInfoTitle>
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
        <STYLE.TabInfoTitle>TRACKING</STYLE.TabInfoTitle>
      </STYLE.Tab>
      <STYLE.Tab $isCurrentPage={page === PAGE.PROFILE}>
        <img
          src={profile_icon}
          alt="profile"
          onClick={() => {
            if (isLogin) {
              setPage(PAGE.PROFILE);
              navigate("/profile/me");
            } else {
              setPage(PAGE.LOGIN);
              alert("로그인이 필요합니다!");
              navigate("/login");
            }
          }}
        />
        <STYLE.TabInfoTitle>PROFILE</STYLE.TabInfoTitle>
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
        <STYLE.TabInfoTitle>SETTING</STYLE.TabInfoTitle>
      </STYLE.Tab>
    </STYLE.Container>
  );
};

export default Footer;
