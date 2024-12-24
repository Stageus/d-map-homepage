import STYLE from "./style";
import house_icon from "./assets/house-solid.svg";
import search_icon from "./assets/magnifying-glass-solid.svg";
import map_icon from "./assets/map-solid.svg";
import profile_icon from "./assets/user-solid.svg";
import setting_icon from "./assets/gear-solid.svg";

const Footer = () => {
  return (
    <STYLE.Container>
      <STYLE.Tab>
        <img src={house_icon} alt="home"/>
      </STYLE.Tab>
      <STYLE.Tab>
        <img src={search_icon} alt="search"/>
      </STYLE.Tab>
      <STYLE.Tab>
        <img src={map_icon} alt="map"/>
      </STYLE.Tab>
      <STYLE.Tab>
        <img src={profile_icon} alt="profile"/>
      </STYLE.Tab>
      <STYLE.Tab>
        <img src={setting_icon} alt="setting"/>
      </STYLE.Tab>
    </STYLE.Container>
  );
};

export default Footer;
