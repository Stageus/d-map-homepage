import STYLE from "./style.js";
import ProfileImage from "../ProfileImage";

const Header = (props) => {
  const { length, name, type, author } = props;
  return (
    <STYLE.ProfileContainer>
      <ProfileImage />
      <STYLE.UserInfo>
        <STYLE.ProfileBox>
          <STYLE.UserName>{name}</STYLE.UserName>
          {author && <STYLE.ProfileButton>•••</STYLE.ProfileButton>}
        </STYLE.ProfileBox>
        {author && <STYLE.Nickname>닉네임 수정</STYLE.Nickname>}
        <STYLE.PostCount>
          {type} 게시물 : {length}개
        </STYLE.PostCount>
      </STYLE.UserInfo>
    </STYLE.ProfileContainer>
  );
};

export default Header;
