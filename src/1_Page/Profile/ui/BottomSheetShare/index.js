import React from "react";
import BottomSheet from "../../../../2_Widget/BottomSheet";
import STYLE from "./style";

const BottomSheetShare = ({ onShare, onDelete, onClose }) => {
  return (
    <BottomSheet onClose={onClose}>
      {({ handleClose }) => (
        <div>
          <STYLE.BottomSheetButton onClick={onShare}>
            공유
          </STYLE.BottomSheetButton>
          <STYLE.BottomSheetButton onClick={onDelete}>
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

export default BottomSheetShare;
