import React from "react";
import Modal from "../Modal";

import STYLE from "./style";
import ConfirmModal from "../../../../../../2_Widget/ConfirmModal";

const ModifyModeModal = (props) => {
  const { handleModifyModeClose, handleSetMode, sumDataLength } = props;

  const handleShare = () => {
    handleSetMode("공유");
    handleModifyModeClose();
  };

  const handleDelete = () => {
    handleSetMode("삭제");
    handleModifyModeClose();
  };

  if (sumDataLength === 0) {
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
      <Modal onClose={handleModifyModeClose} snap={[0.8, 0.3]}>
        {({ handleClose }) => (
          <div>
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
          </div>
        )}
      </Modal>
    </>
  );
};

export default ModifyModeModal;
