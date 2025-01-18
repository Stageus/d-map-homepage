import React from "react";

import STYLE from "./style";
import ConfirmModal from "../../../../../../2_Widget/ConfirmModal";

const ModifyModeModal = (props) => {
  const { handleClose, handleModifyModeClose, handleSetMode, trackDataLegth } =
    props;

  const handleShare = () => {
    handleSetMode("공유");
    handleModifyModeClose();
  };

  const handleDelete = () => {
    handleSetMode("삭제");
    handleModifyModeClose();
  };

  if (trackDataLegth === 0) {
    return (
      <ConfirmModal
        type="one"
        message="편집할 그림이 없습니다"
        onClose={handleModifyModeClose}
      />
    );
  }

  return (
    <>
      <STYLE.BottomSheetButton onClick={handleShare}>
        공유
      </STYLE.BottomSheetButton>
      <STYLE.BottomSheetButton onClick={handleDelete}>
        삭제
      </STYLE.BottomSheetButton>
      <STYLE.BottomSheetButton
        onClick={handleClose}
        bgColor="#007AFF"
        color="#ffffff">
        뒤로가기
      </STYLE.BottomSheetButton>
    </>
  );
};

export default ModifyModeModal;
