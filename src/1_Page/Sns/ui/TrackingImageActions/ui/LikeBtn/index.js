import React from "react";
import STYLE from "./style";
import like_icon from "../../assets/like.svg";
import un_like_icon from "../../assets/unlike.svg";
const LikeBtn = () => {
  const [like, setLike] = React.useState(false);
  return (
    <>
      <STYLE.Button
        onClick={() => {
          setLike(!like);
        }}
      >
        <img src={like ? like_icon : un_like_icon} alt="go detail" />
      </STYLE.Button>
    </>
  );
};

export default LikeBtn;
