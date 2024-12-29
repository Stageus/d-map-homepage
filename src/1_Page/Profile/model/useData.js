import { useEffect, useState } from "react";
import useTrackData from "../api/useTrackingList";
import useModifySharingTracking from "../api/useModifySharingTracking";

const useData = (userIdx) => {
  const { track, trackLoading, trackError, fetchTrackData } =
    useTrackData(userIdx); // 데이터 호출
  const { modifySharing, loading, error } = useModifySharingTracking(); // 데이터 수정
  const [trackData, setTrackData] = useState([]);
  const [modifyIdxList, setModifyList] = useState([]);

  useEffect(() => {
    if (!track.message) return;
    setTrackData(track.message);
  }, [track]);

  const handleAddModifyList = (track) => {
    if (modifyIdxList.includes(track.idx)) {
      setModifyList((prev) => prev.filter((idx) => idx !== track.idx));
      return;
    }
    setModifyList((prev) => [...prev, track.idx]);
  };

  // 데이터 변경 취소
  const handleCancel = () => {
    setTrackData(track.message);
  };

  const handleToggleSharing = (track) => {
    handleAddModifyList(track);
    setTrackData((prevData) =>
      prevData.map((item) =>
        item === track ? { ...item, sharing: item.sharing === 1 ? 0 : 1 } : item
      )
    );
  };

  const handleModify = async () => {
    await modifySharing(modifyIdxList);
    await fetchTrackData();
  };

  return {
    trackData,
    trackLoading,
    trackError,
    handleToggleSharing,
    handleCancel,
    handleModify,
  };
};

export default useData;
