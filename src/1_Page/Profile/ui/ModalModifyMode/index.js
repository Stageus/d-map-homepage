import React from "react";
import BottomSheet from "../../../../2_Widget/BottomSheet";
import STYLE from "./style";
import ModalOneBtn from "../../../../2_Widget/ModalOneBtn";

const ModalModifyMode = (props) => {
  const { activeTab, handleModifyClickFalse, handleSetMode, handleGetLength } =
    props;
  const handleShare = () => {
    handleSetMode("공유");
    handleModifyClickFalse();
  };

  const handleDelete = () => {
    handleSetMode("삭제");
    handleModifyClickFalse();
  };

  if (handleGetLength(activeTab) === 0) {
    return (
      <ModalOneBtn
        message="편집할 그림이 없습니다"
        onClose={handleModifyClickFalse}
      />
    );
  }

  return (
    <BottomSheet onClose={handleModifyClickFalse} snap={[0.8, 0.3]}>
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
    </BottomSheet>
  );
};

export default ModalModifyMode;
