import { useEffect, useState } from "react";
import useGetTrackData from "../../../3_Entity/Profile/useGetTrackData";
import useModifySharingTracking from "../../../3_Entity/Profile/useModifySharingTracking";
import useDeleteTrackingImage from "../../../3_Entity/Profile/useDeleteTrackingImage";

const useManageTrackData = (userIdx) => {
  const { track, fetchTrackData } = useGetTrackData(userIdx); // 데이터 호출 api

  const { modifySharing } = useModifySharingTracking(); // 데이터 수정 api
  const { deleteTrackingImage, status } = useDeleteTrackingImage();

  const [trackData, setTrackData] = useState([]);

  // fetch된 데이터로 화면 생성
  useEffect(() => {
    if (!track) return;
    setTrackData(track);
  }, [track]);

  // 수정 및 삭제 시 선택된 데이터 관리 STATE
  const [modifyIdxList, setModifyList] = useState([]);

  // 데이터 변경 취소
  const handleSelectCancel = () => {
    setTrackData(track);
    setModifyList([]);
  };

  // 수정 또는 삭제 시 STATE에 데이터 추가
  const handleAddModifyList = (track) => {
    if (modifyIdxList.includes(track.idx)) {
      setModifyList((prev) => prev.filter((idx) => idx !== track.idx));
      return;
    }
    setModifyList((prev) => [...prev, track.idx]);
  };

  // 삭제상태 트랙 선택시 -> 삭제할 데이터 추가
  const handleDeleteAdd = (track) => {
    handleAddModifyList(track);
  };

  // 삭제버튼 ->  삭제 및 reFetch
  const handleDeleteTrack = async () => {
    await deleteTrackingImage(modifyIdxList);
    setModifyList([]);
    await fetchTrackData();
  };

  // 데이터 상태 바꾸기 , 수정 데이터 추가
  const handleToggleTrackType = (track) => {
    handleAddModifyList(track);
    setTrackData((prevData) =>
      prevData.map((item) =>
        item === track ? { ...item, sharing: item.sharing === 1 ? 0 : 1 } : item
      )
    );
  };

  // 수정버튼 클릭 -> 수정 및 refetch
  const handleModifyTrack = async () => {
    await modifySharing(modifyIdxList);
    setModifyList([]);
    await fetchTrackData();
  };

  const getTrackLength = (isShared) =>
    trackData.filter((track) => track.sharing === isShared).length;

  return {
    trackData,
    handleToggleTrackType,
    handleSelectCancel,
    handleModifyTrack,
    handleDeleteTrack,
    handleDeleteAdd,
    getTrackLength,
  };
};

export default useManageTrackData;
