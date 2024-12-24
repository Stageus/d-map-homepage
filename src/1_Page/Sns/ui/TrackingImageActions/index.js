import STYLE from "./style";
import unlike_icon from "./assets/unlike.svg"
import like_icon from "./assets/like.svg"
import share_icon from "./assets/share.svg"
import detail_icon from "./assets/detail.svg"
import openInTrackingPage_icon from "./assets/openInTrackingPage.svg"
import { useNavigate } from "react-router-dom";
const TrackingImageActions = (props) => {
  const navigate = useNavigate();
  const {data} = props;
  const {like = false, likecount} = data;
  return (
    <STYLE.InfoContainer>
      <p>좋아요: {likecount}</p>
      <STYLE.IconContainer>
        <STYLE.Icon src={like ? like_icon : unlike_icon} />
        <STYLE.Icon src={share_icon} />
        <STYLE.Icon src={detail_icon} />
        <STYLE.Icon src={openInTrackingPage_icon} onClick={()=>{navigate("/tracking")}}/>
          {/* 여기서, 현재 트래킹이미지의 line 데이터를 recoil atom에 반영하고 tracking page로 이동해야함 */}
      </STYLE.IconContainer>
    </STYLE.InfoContainer>
  );
};

export default TrackingImageActions;
