import { useState, useEffect, useCallback } from "react";
import {
  calculateTrackingLength,
  categorizeTrackData,
  extractIdxLists,
  filterTrackData,
  moveTrack,
  removeDuplicateData,
} from "../lib/profileUtil";

const useManageTrackData = (
  trackingImageData = [],
  deleteTrackingImage,
  putTrackingImageToNotShare,
  putTrackingImageToShare
) => {
  // 상태 선언
  const [trackData, setTrackData] = useState({ save: [], share: [] });
  const [modifyIdxList, setModifyIdxList] = useState([]);
  const [changeTrackingLength, setChangeTrackingLength] = useState({
    save: 0,
    share: 0,
  });
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const [modifyTrigger, setModifyTrigger] = useState(false);

  // 기존 데이터를 기억하는 상태
  const [memorizedTrackData, setMemorizedTrackData] = useState(null);

  // 초기 데이터 세팅
  useEffect(() => {
    const combinedData = removeDuplicateData([
      ...trackData.save,
      ...trackData.share,
      ...trackingImageData,
    ]);
    const categroized = categorizeTrackData(combinedData);
    setTrackData(categroized);
    setMemorizedTrackData(categroized);
  }, [trackingImageData]);

  // 삭제 트리거 감지 및 처리
  useEffect(() => {
    if (deleteTrigger) {
      handleDeleteTrack();
      setDeleteTrigger(false);
    }
  }, [deleteTrigger]);

  // 수정 트리거 감지 및 처리
  useEffect(() => {
    if (modifyTrigger) {
      handleModifyTrack();
      setModifyTrigger(false);
    }
  }, [modifyTrigger]);

  // 선택된 트랙 업데이트
  const updateSelectedTracks = useCallback((track, isDelete) => {
    if (!isDelete) {
      setTrackData((prev) => {
        const { save, share } = prev;
        const isInSave = save.some((prevTrack) => prevTrack.idx === track.idx);
        const { updatedFrom, updatedTo } = isInSave
          ? moveTrack(track, save, share, true)
          : moveTrack(track, share, save, false);

        return isInSave
          ? { save: updatedFrom, share: updatedTo }
          : { save: updatedTo, share: updatedFrom };
      });
    }
    setModifyIdxList((prev) =>
      prev.some((item) => item.idx === track.idx)
        ? prev.filter((item) => item.idx !== track.idx)
        : [...prev, { idx: track.idx, sharing: track.sharing }]
    );
  }, []);

  // 선택 초기화
  const handleSelectCancel = useCallback(() => {
    setModifyIdxList([]);
    setTrackData(memorizedTrackData);
  }, [memorizedTrackData]);

  // 트래킹 데이터 수정
  const handleModifyTrack = useCallback(() => {
    const { idxToShare, idxToNotShare } = extractIdxLists(modifyIdxList);
    if (idxToShare.length > 0) putTrackingImageToShare(idxToShare);
    if (idxToNotShare.length > 0) putTrackingImageToNotShare(idxToNotShare);

    setModifyIdxList([]);
    setMemorizedTrackData(trackData);
    setChangeTrackingLength((prev) =>
      calculateTrackingLength(prev, idxToShare, idxToNotShare)
    );
  }, [modifyIdxList, trackData]);

  // 트래킹 데이터 삭제
  const handleDeleteTrack = useCallback(() => {
    const idxList = modifyIdxList.map((item) => item.idx);
    deleteTrackingImage(idxList);
    setChangeTrackingLength((prev) =>
      calculateTrackingLength(prev, [], idxList)
    );
    setTrackData((prev) => filterTrackData(prev, modifyIdxList));

    setMemorizedTrackData(trackData);
    setModifyIdxList([]);
  }, [modifyIdxList, trackData]);

  return [
    trackData,
    changeTrackingLength,
    modifyIdxList,
    setDeleteTrigger,
    setModifyTrigger,
    updateSelectedTracks,
    handleSelectCancel,
  ];
};

export default useManageTrackData;
