import { useEffect, useState } from "react";
import useTrackData from "../api/useTrackingList";
import useModifySharingTracking from "../api/useModifySharingTracking";
import useDeleteTrackingImage from "../api/useDeleteTrackingImage";

const useManageTrackData = (userIdx) => {
  const { track, trackLoading, trackError, fetchTrackData } =
    useTrackData(userIdx); // 데이터 호출 api
  const { modifySharing } = useModifySharingTracking(); // 데이터 수정 api
  const { deleteTrackingImage, status } = useDeleteTrackingImage();

  const [trackData, setTrackData] = useState([]);
  const [modifyIdxList, setModifyList] = useState([]);

  useEffect(() => {
    if (!track.message) return;
    setTrackData(track.message);
  }, [track]);

  // 데이터 변경 취소
  const handleCancel = () => {
    setTrackData(track.message);
    setModifyList([]);
  };

  const handleAddModifyList = (track) => {
    if (modifyIdxList.includes(track.idx)) {
      setModifyList((prev) => prev.filter((idx) => idx !== track.idx));
      return;
    }
    setModifyList((prev) => [...prev, track.idx]);
  };

  const handleDeleteAdd = async (track) => {
    handleAddModifyList(track);
  };

  const handleDelete = async () => {
    await deleteTrackingImage(modifyIdxList);
    setModifyList([]);
    await fetchTrackData();
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
    setModifyList([]);
    await fetchTrackData();
  };

  const getLength = (isShared) =>
    trackData.filter((track) => track.sharing === isShared).length;

  return {
    trackData,
    trackLoading,
    trackError,
    handleToggleSharing,
    handleCancel,
    handleModify,
    handleDelete,
    handleDeleteAdd,
    getLength,
  };
};

export default useManageTrackData;
