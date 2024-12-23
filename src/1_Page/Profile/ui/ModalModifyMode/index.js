import React from "react";
import Modal from "../../../../2_Widget/Modal";
import STYLE from "./style";
import ModalConfirm from "../../../../2_Widget/ModalConfirm";

const ModalModifyMode = (props) => {
  const { activeTab, handleModifyClickFalse, handleSetMode, sumDataLength } =
    props;
  const handleShare = () => {
    handleSetMode("공유");
    handleModifyClickFalse();
  };

  const handleDelete = () => {
    handleSetMode("삭제");
    handleModifyClickFalse();
  };

  if (sumDataLength === 0) {
    return (
      <ModalConfirm
        type="one"
        message="편집할 그림이 없습니다"
        onClose={handleModifyClickFalse}
      />
    );
  }

  return (
    <Modal onClose={handleModifyClickFalse} snap={[0.8, 0.3]}>
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
  );
};

export default ModalModifyMode;
