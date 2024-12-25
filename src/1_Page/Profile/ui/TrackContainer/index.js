import React, { useState } from "react";
import Tracking from "../../../../2_Widget/TrackingImage";
import STYLE from "./style";
import useLongPressEvent from "../../../../4_Shared/useLongPressEvent";
import Modal from "../../../../2_Widget/Modal";
import useModifyTrackingModal from "./model/useModifyTrackingModal";

const TrackContainer = (props) => {
  const { data, modifyMode, author } = props;
  const { shareData, saveData, setSaveData, setShareData } = props.totalData;
  const {
    modifyTrackingModal,
    handleModifyTrackingClose,
    handleModifyTrackingOpen,
  } = useModifyTrackingModal();

  const [pinchedData, setPinchedData] = useState(null);

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
      handleModifyTrackingOpen();
      setPinchedData(data);
    },
    null,
    1000
  );

  return (
    <>
      <STYLE.TrackingContainer {...(author && !modifyMode && longPressEvents)}>
        {modifyMode === "공유" && (
          <STYLE.TrackingClickBox onClick={handleAnotherType} />
        )}
        {modifyMode === "삭제" && <STYLE.TrackingCheckbox />}
        <Tracking dragable={false} data={{ ...data, height: "100%" }} />
      </STYLE.TrackingContainer>
      {modifyTrackingModal && pinchedData && (
        <Modal onClose={handleModifyTrackingClose} trackData={pinchedData} />
      )}
    </>
  );
};

export default TrackContainer;
