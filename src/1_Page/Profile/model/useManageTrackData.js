import { useState, useCallback, useEffect, useRef } from "react";

const useManageTrackData = (trackingImageList, tabIndex, checkLessLength) => {
  const [trackData, setTrackData] = useState([]);
  const [modifyIdxList, setModifyIdxList] = useState([]);
  const prevLength = useRef(null);

  useEffect(() => {
    setTrackData((prev) => {
      const newItems = trackingImageList.filter(
        (item) => !prev.some((prevItem) => prevItem.idx === item.idx)
      );
      return [...prev, ...newItems];
    });
    removeDuplicateData();
  }, [trackingImageList]);

  const shareTrackingImageData = trackData.filter((item) => item.sharing);
  const saveTrackingImageData = trackData.filter((item) => !item.sharing);

  useEffect(() => {
    const currentTrackData =
      tabIndex === 0 ? shareTrackingImageData : saveTrackingImageData;
    if (currentTrackData.length === 0) return;

    if (currentTrackData.length !== prevLength.current) {
      checkLessLength(currentTrackData.length);
      prevLength.current = currentTrackData.length;
    }
  }, [
    shareTrackingImageData,
    saveTrackingImageData,
    tabIndex,
    checkLessLength,
  ]);

  const sortTrackData = useCallback(() => {
    setTrackData((prev) => [...prev].sort((a, b) => b.idx - a.idx));
  }, []);

  // 중복 데이터 제거
  const removeDuplicateData = useCallback(() => {
    setTrackData((prev) => {
      const uniqueData = prev.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.idx === item.idx)
      );
      return uniqueData;
    });
  }, []);

  // 선택된 데이터 한번 클릭시 추가 두번 클릭시 삭제
  const toggleModifyIdxList = useCallback((track) => {
    setModifyIdxList((prev) =>
      prev.some((item) => item.idx === track.idx)
        ? prev.filter((item) => item.idx !== track.idx)
        : [...prev, { idx: track.idx, sharing: track.sharing }]
    );
  }, []);

  // 선택 초기화
  const handleSelectCancel = useCallback(() => {
    setModifyIdxList([]);
    setTrackData(trackingImageList || []);
  }, [trackingImageList]);

  // 데이터 선택
  const handleAddModifyIdxList = useCallback(
    (track, isDelete = false) => {
      toggleModifyIdxList(track);

      // 수정인 경우 toggle
      if (isDelete) return;
      setTrackData((prev) =>
        prev.map((item) =>
          item.idx === track.idx ? { ...item, sharing: !item.sharing } : item
        )
      );
      sortTrackData();
      removeDuplicateData();
    },
    [toggleModifyIdxList, sortTrackData, removeDuplicateData]
  );

  return {
    setTrackData,
    modifyIdxList,
    setModifyIdxList,
    shareTrackingImageData,
    saveTrackingImageData,
    handleAddModifyIdxList,
    handleSelectCancel,
    sortTrackData,
  };
};

export default useManageTrackData;
