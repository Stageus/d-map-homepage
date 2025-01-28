import { useState, useEffect, useCallback } from "react";
import {
  calculateTrackingLength,
  categorizeTrackData,
  extractIdxLists,
  filterTrackData,
  moveTrack,
  removeDuplicateData,
  sortTrackData,
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
    const categroizedTrackingData = categorizeTrackData(trackingImageData);
    setTrackData(categroized);
    setMemorizedTrackData((prev) => {
      return { ...prev, ...categroizedTrackingData };
    });
  }, [trackingImageData]);

  // 삭제 트리거 감지 및 처리
  useEffect(() => {
    if (deleteTrigger) {
      const idxList = modifyIdxList.map((item) => item.idx);
      handleDeleteTrack(idxList);
      deleteTrackingImage(idxList);
      setDeleteTrigger(false);
    }
  }, [deleteTrigger]);

  // 수정 트리거 감지 및 처리
  useEffect(() => {
    if (modifyTrigger) {
      const { idxToShare, idxToNotShare } = extractIdxLists(modifyIdxList);
      if (idxToShare.length > 0) putTrackingImageToShare(idxToShare);
      if (idxToNotShare.length > 0) putTrackingImageToNotShare(idxToNotShare);
      handleModifyTrack(idxToShare, idxToNotShare);
      setModifyTrigger(false);
    }
  }, [modifyTrigger]);

  // 선택된 트랙 업데이트
  const updateSelectedTracks = (track, isDelete) => {
    if (!isDelete) {
      setTrackData((prev) => {
        const { save, share } = prev;
        const isInSave = save.some((prevTrack) => prevTrack.idx === track.idx);
        const { updatedFrom, updatedTo } = isInSave
          ? moveTrack(track, save, share, true)
          : moveTrack(track, share, save, false);

        // 정렬 후 새로운 상태 반환
        return isInSave
          ? {
              save: sortTrackData(updatedFrom),
              share: sortTrackData(updatedTo),
            }
          : {
              save: sortTrackData(updatedTo),
              share: sortTrackData(updatedFrom),
            };
      });
    }
    setModifyIdxList((prev) =>
      prev.some((item) => item.idx === track.idx)
        ? prev.filter((item) => item.idx !== track.idx)
        : [...prev, { idx: track.idx, sharing: track.sharing }]
    );
  };

  // 선택 초기화
  const handleSelectCancel = () => {
    setModifyIdxList([]);
    setTrackData(memorizedTrackData);
  };

  // 트래킹 데이터 수정
  const handleModifyTrack = (idxToShare, idxToNotShare) => {
    setModifyIdxList([]);
    setMemorizedTrackData(trackData);
    setChangeTrackingLength((prev) =>
      calculateTrackingLength(prev, idxToShare, idxToNotShare)
    );
  };

  // 트래킹 데이터 삭제
  const handleDeleteTrack = (idxList) => {
    deleteTrackingImage(idxList);
    setChangeTrackingLength((prev) =>
      calculateTrackingLength(prev, [], idxList)
    );
    setTrackData((prev) => filterTrackData(prev, modifyIdxList));
    setMemorizedTrackData(trackData);
    setModifyIdxList([]);
  };

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
