import React from "react";
import STYLE from "./style";

const ModifyModeModalContent = ({
  handleClose,
  handleModifyModeClose,
  handleSetMode,
}) => {
  const handleAction = (mode) => {
    handleSetMode(mode);
    handleModifyModeClose();
  };

  return (
    <>
      <STYLE.BottomSheetButton onClick={() => handleAction("공유")}>
        공유
      </STYLE.BottomSheetButton>
      <STYLE.BottomSheetButton onClick={() => handleAction("삭제")}>
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

export default ModifyModeModalContent;
