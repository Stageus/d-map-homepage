import React from "react";
import STYLE from "./style.js";

const Header = (props) => {
  const { length, name, type, author } = props;
  const { handleModalModifyTrue } = props;
  const { handleNameModalOpen } = props;
  const { modifyMode, handleCloseMode } = props;
  const { profileImage } = props;
  const { handleSetConfirmModalOpen } = props;

  return (
    <>
      {!modifyMode ? (
        <STYLE.ProfileContainer>
          <STYLE.ProfileWrapper>
            <STYLE.ProfileImg src={profileImage} alt="Profile" />
          </STYLE.ProfileWrapper>
          <STYLE.UserInfo>
            <STYLE.ProfileBox>
              <STYLE.UserName>{name}</STYLE.UserName>
              {author && (
                <STYLE.ProfileButton onClick={handleModalModifyTrue}>
                  •••
                </STYLE.ProfileButton>
              )}
            </STYLE.ProfileBox>
            {author && (
              <STYLE.Nickname onClick={handleNameModalOpen}>
                닉네임 수정
              </STYLE.Nickname>
            )}
            <STYLE.PostCount>
              {type} 게시물 : {length}개
            </STYLE.PostCount>
          </STYLE.UserInfo>
        </STYLE.ProfileContainer>
      ) : (
        <STYLE.Container>
          <STYLE.Title>{modifyMode} 설정</STYLE.Title>
          <STYLE.ButtonWrapper>
            <STYLE.Button
              $primary
              onClick={() => {
                handleSetConfirmModalOpen();
              }}>
              완료
            </STYLE.Button>
            <STYLE.Button onClick={handleCloseMode}>취소</STYLE.Button>
          </STYLE.ButtonWrapper>
        </STYLE.Container>
      )}
    </>
  );
};

export default React.memo(Header, (prevProps, nextProps) => {
  return (
    prevProps.name === nextProps.name &&
    prevProps.length === nextProps.length &&
    prevProps.type === nextProps.type &&
    prevProps.modifyMode === nextProps.modifyMode
  );
});
