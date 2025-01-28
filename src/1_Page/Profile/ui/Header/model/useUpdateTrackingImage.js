import { useEffect, useState } from "react";
import {
  calculateTrackingLength,
  categorizeTrackData,
  extractIdxLists,
  filterTrackData,
} from "../../../lib/profileUtil";

const useUpdateTrackingImage = (
  trackData,
  trackingImageData,
  setTrackData,
  setModifyIdxList
) => {
  // 기존 데이터를 기억하는 상태
  const [memorizedTrackData, setMemorizedTrackData] = useState(null);
  // 초기 데이터 세팅
  useEffect(() => {
    const categroizedTrackingData = categorizeTrackData(trackingImageData);
    setMemorizedTrackData((prev) => {
      return { ...prev, ...categroizedTrackingData };
    });
  }, [trackingImageData]);

  const [changeTrackingLength, setChangeTrackingLength] = useState({
    save: 0,
    share: 0,
  });

  // 선택 초기화
  const handleSelectCancel = () => {
    setModifyIdxList([]);
    setTrackData(memorizedTrackData);
  };

  // 트래킹 데이터 수정
  const handleModifyTrack = (modifyIdxList, isToShare) => {
    const filterIdxList = modifyIdxList.filter((item) => item === isToShare);
    const { idxToShare, idxToNotShare } = extractIdxLists(filterIdxList);
    setModifyIdxList([]);
    setMemorizedTrackData(trackData);
    setChangeTrackingLength((prev) =>
      calculateTrackingLength(prev, idxToShare, idxToNotShare)
    );
  };

  // 트래킹 데이터 삭제
  const handleDeleteTrack = (modifyIdxList) => {
    const idxList = modifyIdxList.map((item) => item.idx);
    setChangeTrackingLength((prev) =>
      calculateTrackingLength(prev, [], idxList)
    );
    setTrackData((prev) => filterTrackData(prev, idxList));
    setMemorizedTrackData(trackData);
    setModifyIdxList([]);
  };

  return [
    changeTrackingLength,
    handleSelectCancel,
    handleModifyTrack,
    handleDeleteTrack,
  ];
};

export default useUpdateTrackingImage;
