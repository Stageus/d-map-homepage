import React from "react";
import ReactDOM from "react-dom";

import STYLE from "./style.js";
import empty_profie_icon from "./assets/empty_profile_icon.svg";

import { calculateAdjustedTrackingLengths } from "./lib/calcualate.js";
import { extractIdxLists } from "../../lib/profileUtil.js";

import useManageUserInfo from "./model/useManageUserInfo.js";
import useUpdateTrackingImage from "./model/useUpdateTrackingImage";

import useModalHandler from "../../../../4_Shared/model/useModalHandler.js";

import ModalBase from "./ui/ModalBase";
import ModifyImageModalContent from "./ui/ModifyImageModalContent";
import ModifyNameModalContent from "./ui/ModifyNameModalContent";
import ModifyModeModalContent from "./ui/ModifyModeModalContent";
import ConfirmModal from "../../../../2_Widget/ConfirmModal";

import useDeleteTrackingImage from "../../../../3_Entity/Tracking/useDeleteTrackingImage.js";
import usePutTrackingImageToNotShare from "../../../../3_Entity/Tracking/usePutTrackingImageToNotShare.js";
import usePutTrackingImageToShare from "../../../../3_Entity/Tracking/usePutTrackingImageToShare.js";

const Header = (props) => {
  const {
    setMode: { modifyMode, handleSetMode, handleCloseMode },
    activeTabStr,
    userInfoData,
    handleTabClick,
    modifyIdxList,
    displayTrackingImage,
    setDisplayTrackingImage,
    setModifyIdxList,
  } = props;

  const [userInfo, handleProfileImageChange, handleChangeNickName] =
    useManageUserInfo(userInfoData);

  const [
    changeTrackingImageDataLength,
    resetSelection,
    handleModifyTrack,
    handleDeleteTrack,
  ] = useUpdateTrackingImage(
    displayTrackingImage,
    setDisplayTrackingImage,
    setModifyIdxList,
    modifyMode
  );

  // 사용
  const adjustedLengths = calculateAdjustedTrackingLengths(
    userInfo,
    changeTrackingImageDataLength
  );

  const [deleteTrackingImage] = useDeleteTrackingImage({
    onSuccess: () => handleDeleteTrack(modifyIdxList),
  });
  const [putTrackingImageToNotShare] = usePutTrackingImageToNotShare({
    onSuccess: () => handleModifyTrack(modifyIdxList, false),
  });
  const [putTrackingImageToShare] = usePutTrackingImageToShare({
    onSuccess: () => handleModifyTrack(modifyIdxList, true),
  });
  const handleModifyClick = () => {
    const { idxToShare, idxToNotShare } = extractIdxLists(modifyIdxList);
    if (idxToShare.length > 0) putTrackingImageToShare(idxToShare);
    if (idxToNotShare.length > 0) putTrackingImageToNotShare(idxToNotShare);
  };
  const handleDeleteClick = () => {
    deleteTrackingImage(modifyIdxList.map((item) => item.idx));
  };

  const [modifyImageModal, modifyImageModalToggle] = useModalHandler(); // 프로필 이미지 모달
  const [modifyNameModal, modifyNameModalToggle] = useModalHandler(); // 닉네임 수정 모달
  const [modifyModeModal, modifyModeModalToggle] = useModalHandler(); // 수정 , 삭제 뒤로가기 모달
  const [confirmModal, confirmModalToggle] = useModalHandler(); // 확인 모달

  return (
    <>
      {!modifyMode ? (
        <STYLE.ProfileContainer>
          <STYLE.ProfileWrapper
            onClick={userInfo?.isMine ? modifyImageModalToggle : undefined}>
            <STYLE.ProfileImg
              src={
                userInfo?.image_url ? userInfo?.image_url : empty_profie_icon
              }
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
              {activeTabStr === "공유"
                ? adjustedLengths.share
                : adjustedLengths.save}
              개
            </STYLE.PostCount>
          </STYLE.UserInfo>
        </STYLE.ProfileContainer>
      ) : (
        <STYLE.Container>
          <STYLE.Title>{modifyMode} 설정</STYLE.Title>
          <STYLE.ButtonWrapper>
            <STYLE.Button $primary onClick={confirmModalToggle}>
              완료
            </STYLE.Button>
            <STYLE.Button
              onClick={() => {
                handleCloseMode();
                resetSelection();
              }}>
              취소
            </STYLE.Button>
          </STYLE.ButtonWrapper>
        </STYLE.Container>
      )}
      <STYLE.TabMenu>
        {userInfo?.isMine ? (
          <>
            <STYLE.Tab
              $active={activeTabStr === "공유"}
              onClick={() => handleTabClick("공유")}>
              공유
            </STYLE.Tab>
            <STYLE.Tab
              $active={activeTabStr === "저장"}
              onClick={() => handleTabClick("저장")}>
              저장
            </STYLE.Tab>
          </>
        ) : (
          <STYLE.TabNone>게시물</STYLE.TabNone>
        )}
      </STYLE.TabMenu>

      {modifyImageModal && (
        <ModalBase onClose={modifyImageModalToggle} snap={[0.2]}>
          {({ handleClose }) => (
            <ModifyImageModalContent
              image={userInfo?.image_url}
              handleProfileImageChange={handleProfileImageChange}
              handleClose={handleClose}
            />
          )}
        </ModalBase>
      )}

      {modifyNameModal && (
        <ModalBase onClose={modifyNameModalToggle} snap={[0.2]}>
          {({ handleClose }) => (
            <ModifyNameModalContent
              handleChangeNickName={handleChangeNickName}
              handleClose={handleClose}
              name={userInfo?.nickname}
            />
          )}
        </ModalBase>
      )}

      {modifyModeModal &&
        (displayTrackingImage === 0 ? (
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

      {confirmModal && (
        <ConfirmModal
          message={
            modifyIdxList.length === 0
              ? "선택된 데이터가 없습니다"
              : modifyMode === "삭제"
              ? "선택한 그림을 모두 삭제하시겠습니까?"
              : "변경사항을 저장하시겠습니까?"
          }
          type={modifyIdxList.length === 0 && "one"}
          onClose={confirmModalToggle}
          onConfirm={() => {
            modifyMode === "삭제" ? handleDeleteClick() : handleModifyClick();
            handleCloseMode();
            confirmModalToggle();
          }}
          onCancel={confirmModalToggle}
        />
      )}
    </>
  );
};
export default Header;
// export default React.memo(Header, shallowEqual); // 얕은 복사 비교해서 props변동이 있을때만 렌더링
