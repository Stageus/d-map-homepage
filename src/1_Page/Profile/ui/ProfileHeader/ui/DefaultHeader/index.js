// Header.jsx
import React from "react";
import STYLE from "./style.js";
import empty_profie_icon from "./assets/empty_profile_icon.svg";
import ModalBase from "./ui/ModalBase/index.js";
import ModifyImageModalContent from "./ui/ModifyImageModalContent/index.js";
import ModifyNameModalContent from "./ui/ModifyNameModalContent/index.js";
import ModifyModeModalContent from "./ui/ModifyModeModalContent/index.js";
import ConfirmModal from "../../../../../../2_Widget/ConfirmModal/index.js";
import useModalHandler from "../../../../../../4_Shared/model/useModalHandler.js";
import ReactDOM from "react-dom";

const DefaultHeader = (props) => {
  const { userInfo, activeTabStr, handleSetMode, fetchUserInfo } = props;

  const [modifyImageModal, modifyImageModalToggle] = useModalHandler();
  const [modifyNameModal, modifyNameModalToggle] = useModalHandler();
  const [modifyModeModal, modifyModeModalToggle] = useModalHandler();

  return (
    <>
      <STYLE.ProfileContainer>
        <STYLE.ProfileWrapper
          onClick={userInfo?.isMine ? modifyImageModalToggle : undefined}>
          <STYLE.ProfileImg
            src={userInfo?.image_url ? userInfo.image_url : empty_profie_icon}
          />
        </STYLE.ProfileWrapper>
        <STYLE.UserInfo>
          <STYLE.ProfileBox>
            <STYLE.UserName>{userInfo?.nickname}</STYLE.UserName>
            {userInfo?.isMine && (
              <STYLE.ProfileButton onClick={modifyModeModalToggle}>
                •••
              </STYLE.ProfileButton>
            )}
          </STYLE.ProfileBox>
          {userInfo?.isMine && (
            <STYLE.Nickname onClick={modifyNameModalToggle}>
              닉네임 수정
            </STYLE.Nickname>
          )}
          <STYLE.PostCount>
            {activeTabStr} 게시물 :{" "}
            {activeTabStr === "공개"
              ? userInfo?.share_tracking_length
              : userInfo?.total_tracking_length -
                userInfo?.share_tracking_length}
            개
          </STYLE.PostCount>
        </STYLE.UserInfo>
      </STYLE.ProfileContainer>

      {modifyImageModal && (
        <ModalBase onClose={modifyImageModalToggle} snap={[0.2]}>
          {({ handleClose }) => (
            <ModifyImageModalContent
              image={userInfo?.image_url}
              fetchUserInfo={fetchUserInfo}
              handleClose={handleClose}
            />
          )}
        </ModalBase>
      )}

      {modifyNameModal && (
        <ModalBase onClose={modifyNameModalToggle} snap={[0.2]}>
          {({ handleClose }) => (
            <ModifyNameModalContent
              fetchUserInfo={fetchUserInfo}
              handleClose={handleClose}
              name={userInfo?.nickname}
            />
          )}
        </ModalBase>
      )}

      {modifyModeModal &&
        (userInfo?.total_tracking_length === 0 ? (
          ReactDOM.createPortal(
            <ConfirmModal
              type="one"
              message="편집할 그림이 없습니다"
              onClose={modifyModeModalToggle}
            />,
            document.body
          )
        ) : (
          <ModalBase onClose={modifyModeModalToggle} snap={[0.2]}>
            {({ handleClose }) => (
              <ModifyModeModalContent
                handleSetMode={handleSetMode}
                handleClose={handleClose}
                handleModifyModeClose={modifyModeModalToggle}
              />
            )}
          </ModalBase>
        ))}
    </>
  );
};

export default React.memo(DefaultHeader);
