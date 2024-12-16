import STYLE from "./style";
import house_icon from "./assets/house-solid.svg"
import search_icon from "./assets/magnifying-glass-solid.svg"
import map_icon from "./assets/map-solid.svg"
import profile_icon from "./assets/user-solid.svg"
import setting_icon from "./assets/gear-solid.svg"

const Footer = () => {
  return (
    <STYLE.Container>
      <STYLE.Tab src={house_icon} />
      <STYLE.Tab src={search_icon} />
      <STYLE.Tab src={map_icon} />
      <STYLE.Tab src={profile_icon} />
      <STYLE.Tab src={setting_icon} />
    </STYLE.Container>
  );
}

export default Footer;
