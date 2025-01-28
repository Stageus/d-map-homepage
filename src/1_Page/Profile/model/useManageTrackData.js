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

const useManageTrackData = (trackingImageData = [], deleteTrackingImage) => {
  // 상태 선언
  const [trackData, setTrackData] = useState({ save: [], share: [] });
  const [modifyIdxList, setModifyIdxList] = useState([]);

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

  return [trackData, modifyIdxList, updateSelectedTracks];
};

export default useManageTrackData;
