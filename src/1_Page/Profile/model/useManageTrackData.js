import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import putTrackingToShare from "../../../3_Entity/Tracking/putTrackingImageToShare";
import putTrackingToNotShare from "../../../3_Entity/Tracking/putTrackingImageToNotShare";
import deleteTrackingImage from "../../../3_Entity/Tracking/deleteTrackingImage";

const useManageTrackData = (
  trackingImageList,
  tabIndex,
  checkLessLength,
  showErrorModal
) => {
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

  // 데이터 삭제
  const handleDeleteTrack = useCallback(async () => {
    const idxList = modifyIdxList.map((item) => item.idx);
    const result = await deleteTrackingImage(idxList);

    if (result === true) {
      setTrackData((prev) =>
        prev.filter(({ idx }) => !modifyIdxList.some((mod) => mod.idx === idx))
      );
      setModifyIdxList([]);
      return;
    }
    showErrorModal(result);
    handleSelectCancel();
  }, [modifyIdxList, showErrorModal]);

  const handleModifyTrack = useCallback(async () => {
    const idxToShare = modifyIdxList
      .filter((item) => !item.sharing)
      .map((item) => item.idx);
    const idxToNotShare = modifyIdxList
      .filter((item) => item.sharing)
      .map((item) => item.idx);
    const resultToShare = await putTrackingToShare(idxToShare);
    const resultToNotShare = await putTrackingToNotShare(idxToNotShare);
    if (resultToShare === true && resultToNotShare === true) {
      setModifyIdxList([]);
      sortTrackData();
      return;
    }
    showErrorModal(resultToShare !== true ? resultToShare : resultToNotShare);
    handleSelectCancel();
  }, [modifyIdxList, sortTrackData, showErrorModal]);

  const memoizedHandlers = useMemo(
    () => ({
      handleSelectCancel,
      handleDeleteTrack,
      handleModifyTrack,
    }),
    [handleSelectCancel, handleDeleteTrack, handleModifyTrack]
  );

  return {
    modifyIdxList,
    shareTrackingImageData,
    saveTrackingImageData,
    handleAddModifyIdxList,
    memoizedHandlers,
  };
};

export default useManageTrackData;
