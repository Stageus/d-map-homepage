import STYLE from "./style";
import { useNavigate } from "react-router-dom";
import home_icon from "./assets/home.svg";
import search_icon from "./assets/magnifying-glass-solid.svg";
import map_icon from "./assets/map.svg";
import profile_icon from "./assets/user.svg";
import setting_icon from "./assets/setting.svg";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <STYLE.Container>
      <STYLE.Tab>
        <img src={home_icon} alt="home"  onClick={() => {
          navigate("/");
        }}/>
      </STYLE.Tab>
      <STYLE.Tab>
        <img src={search_icon} alt="search" onClick={() => {
          navigate("/search/:category?text=");
        }}/>
      </STYLE.Tab>
      <STYLE.Tab>
        <img src={map_icon} alt="map" onClick={() => {
          navigate("/tracking");
        }}/>
      </STYLE.Tab>
      <STYLE.Tab>
        <img src={profile_icon} alt="profile" onClick={() => {
          navigate("/profile/:userIdx");
        }}/>
      </STYLE.Tab>
      <STYLE.Tab>
        <img src={setting_icon} alt="setting" onClick={() => {
          navigate("/setting");
        }}/>
      </STYLE.Tab>
    </STYLE.Container>
  );
};

export default Footer;
