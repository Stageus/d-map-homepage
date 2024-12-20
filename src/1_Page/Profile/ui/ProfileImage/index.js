import React from "react";
import STYLE from "./style";

const ProfileImage = ({ profileImage }) => {
  return (
    <STYLE.ProfileWrapper>
      <STYLE.ProfileImg src={profileImage} alt="Profile" />
    </STYLE.ProfileWrapper>
  );
};

export default ProfileImage;
