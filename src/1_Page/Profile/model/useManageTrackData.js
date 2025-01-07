import { useEffect, useState } from "react";
import useGetTrackData from "../../../3_Entity/Profile/useGetTrackData";
import useModifySharingTracking from "../../../3_Entity/Profile/useModifySharingTracking";
import useDeleteTrackingImage from "../../../3_Entity/Profile/useDeleteTrackingImage";

const useManageTrackData = (userIdx, page) => {
  const { track, trackLoading, trackError, fetchTrackData } = useGetTrackData(
    userIdx,
    page
  ); // 데이터 호출 api
  const { modifySharing } = useModifySharingTracking(); // 데이터 수정 api
  const { deleteTrackingImage, status } = useDeleteTrackingImage();

  const [trackData, setTrackData] = useState([]);
  const [modifyIdxList, setModifyList] = useState([]);

  useEffect(() => {
    if (!track) return;
    setTrackData(track);
  }, [track]);

  // 데이터 변경 취소
  const handleSelectCancel = () => {
    setTrackData(track);
    setModifyList([]);
  };

  const handleAddModifyList = (track) => {
    if (modifyIdxList.includes(track.idx)) {
      setModifyList((prev) => prev.filter((idx) => idx !== track.idx));
      return;
    }
    setModifyList((prev) => [...prev, track.idx]);
  };

  const handleDeleteAdd = (track) => {
    handleAddModifyList(track);
  };

  const handleDeleteTrack = async () => {
    await deleteTrackingImage(modifyIdxList);
    setModifyList([]);
    await fetchTrackData();
  };

  const handleToggleTrackType = (track) => {
    handleAddModifyList(track);
    setTrackData((prevData) =>
      prevData.map((item) =>
        item === track ? { ...item, sharing: item.sharing === 1 ? 0 : 1 } : item
      )
    );
  };

  const handleModifyTrack = async () => {
    await modifySharing(modifyIdxList);
    setModifyList([]);
    await fetchTrackData();
  };

  const getTrackLength = (isShared) =>
    trackData.filter((track) => track.sharing === isShared).length;

  return {
    trackData,
    trackLoading,
    trackError,
    handleToggleTrackType,
    handleSelectCancel,
    handleModifyTrack,
    handleDeleteTrack,
    handleDeleteAdd,
    getTrackLength,
  };
};

export default useManageTrackData;
