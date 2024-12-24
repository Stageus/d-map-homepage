import React from "react";
import Tracking from "../../../../2_Widget/TrackingImage";
import STYLE from "./style";
import useLongPressEvent from "../../../../4_Shared/useLongPressEvent";

const TrackContainer = (props) => {
  const { data, checkSetMode, author, handleModifyMapOpen, setPinchedData } =
    props;
  const { shareData, saveData } = props;
  const { setSaveData, setShareData } = props;

  const handleAnotherType = () => {
    if (shareData?.includes(data)) {
      // `shareData`에서 제거하고 `saveData`에 추가
      setShareData((prev) => prev.filter((item) => item !== data));
      setSaveData((prev) => [...prev, data]);
    } else if (saveData?.includes(data)) {
      // `saveData`에서 제거하고 `shareData`에 추가
      setSaveData((prev) => prev.filter((item) => item !== data));
      setShareData((prev) => [...prev, data]);
    }
  };

  const longPressEvents = useLongPressEvent(
    () => {
      handleModifyMapOpen();
      setPinchedData(data);
    },
    null,
    1000
  );

  return (
    <STYLE.TrackingContainer {...(author && !checkSetMode && longPressEvents)}>
      {checkSetMode === "공유" && (
        <STYLE.TrackingClickBox onClick={handleAnotherType} />
      )}
      {checkSetMode === "삭제" && <STYLE.TrackingCheckbox />}
      <Tracking dragable={false} data={{ ...data, height: "100%" }} />
    </STYLE.TrackingContainer>
  );
};

export default TrackContainer;
