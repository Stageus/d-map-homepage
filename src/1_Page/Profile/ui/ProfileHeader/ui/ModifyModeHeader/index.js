// ModifyModeHeader.jsx
import React from "react";
import STYLE from "./style.js";
import ConfirmModal from "../../../../../../2_Widget/ConfirmModal/index.js";
import useModalHandler from "../../../../../../4_Shared/model/useModalHandler.js";
import { extractIdxLists } from "../../../../lib/profileUtil.js";
import useDeleteTrackingImage from "../../../../../../3_Entity/Tracking/useDeleteTrackingImage.js";
import usePutTrackingImageToNotShare from "../../../../../../3_Entity/Tracking/usePutTrackingImageToNotShare.js";
import usePutTrackingImageToShare from "../../../../../../3_Entity/Tracking/usePutTrackingImageToShare.js";
import useUpdateTrackingImageEventManager from "./model/useUpdateTrackingImageEventManager.js";

const ModifyModeHeader = (props) => {
  const {
    modifyMode,
    handleCloseMode,
    modifyIdxList,
    setDisplayTrackingImage,
    setModifyIdxList,
    backupTrackingImageData,
    fetchUserInfo,
  } = props;
  const [confirmModal, confirmModalToggle] = useModalHandler();

  // 수정 이벤트 관리
  const [resetSelection, modifyTrackEvent, deleteTrackEvent] =
    useUpdateTrackingImageEventManager(
      setDisplayTrackingImage,
      setModifyIdxList,
      backupTrackingImageData,
      handleCloseMode,
      confirmModalToggle
    );
  const idxList = modifyIdxList.map((item) => item.idx);
  const { idxToShare, idxToNotShare } = extractIdxLists(modifyIdxList);

  // 수정 API
  const [deleteTrackingImage] = useDeleteTrackingImage(idxList);
  const [putTrackingImageToShare] = usePutTrackingImageToShare(idxToShare);
  const [putTrackingImageToNotShare] =
    usePutTrackingImageToNotShare(idxToNotShare);

  // 클릭이벤트
  const handleModifyClick = async () => {
    const promises = [];
    if (idxToShare.length > 0) promises.push(putTrackingImageToShare());
    if (idxToNotShare.length > 0) promises.push(putTrackingImageToNotShare());
    await Promise.all(promises);
    await fetchUserInfo();
    modifyTrackEvent();
  };
  const handleDeleteClick = async () => {
    await deleteTrackingImage();
    await fetchUserInfo();
    deleteTrackEvent(idxList);
  };

  return (
    <>
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
          }}
          onCancel={confirmModalToggle}
        />
      )}
    </>
  );
};

export default React.memo(ModifyModeHeader);
