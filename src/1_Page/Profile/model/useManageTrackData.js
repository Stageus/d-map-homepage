import { useState, useCallback, useEffect } from "react";
import putTrackingToShare from "../../../3_Entity/Tracking/putTrackingImageToShare";
import putTrackingToNotShare from "../../../3_Entity/Tracking/putTrackingImageToNotShare";
import deleteTrackingImage from "../../../3_Entity/Tracking/deleteTrackingImage";

const useManageTrackData = (trackingImageList) => {
  const [trackData, setTrackData] = useState([]);
  const [modifyIdxList, setModifyIdxList] = useState([]);

  useEffect(() => {
    setTrackData((prev) => {
      const newItems = trackingImageList.filter(
        (item) => !prev.some((prevItem) => prevItem.idx === item.idx)
      );
      return [...prev, ...newItems];
    });
    deleteRepeatData();
  }, [trackingImageList]);

  const [shareTrackingImageData, saveTrackingImageData] = [
    trackData.filter((item) => item.sharing === true),
    trackData.filter((item) => item.sharing === false),
  ];

  const sortTrackData = useCallback(() => {
    setTrackData((prev) => [...prev].sort((a, b) => b.userIdx - a.userIdx));
  }, []);

  // 중복 데이터 제거
  const deleteRepeatData = useCallback(() => {
    setTrackData((prev) => {
      const uniqueData = prev.reduce((acc, current) => {
        const isDuplicate = acc.some((item) => item.idx === current.idx);
        if (!isDuplicate) acc.push(current);
        return acc;
      }, []);
      return uniqueData;
    });
  }, []);

  // 수정 리스트 토글
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

  // 데이터 추가 및 업데이트
  const handleAddModifyIdxList = useCallback(
    (track, isDelete = false) => {
      toggleModifyIdxList(track);
      if (isDelete) return;
      setTrackData((prev) =>
        prev.map((item) =>
          item.idx === track.idx ? { ...item, sharing: !item.sharing } : item
        )
      );
      sortTrackData();
      deleteRepeatData();
    },
    [toggleModifyIdxList, sortTrackData, deleteRepeatData]
  );

  // 데이터 삭제
  const handleDeleteTrack = useCallback(async () => {
    const idxList = modifyIdxList.map((item) => item.idx);
    const result = await deleteTrackingImage(idxList);
    if (result) {
      setTrackData((prev) =>
        prev.filter(
          (item) => !modifyIdxList.some((mod) => mod.idx === item.idx)
        )
      );
      setModifyIdxList([]);
    }
  }, [modifyIdxList]);

  // 데이터 수정
  const handleModifyTrack = useCallback(async () => {
    try {
      const groupedBySharing = modifyIdxList.reduce(
        (acc, item) => {
          acc[item.sharing ? "toNotshare" : "toShare"].push(item.idx);
          return acc;
        },
        { toShare: [], toNotshare: [] }
      );

      if (groupedBySharing.toShare.length) {
        await putTrackingToShare(groupedBySharing.toShare);
      }
      if (groupedBySharing.toNotshare.length) {
        await putTrackingToNotShare(groupedBySharing.toNotshare);
      }

      setModifyIdxList([]);
      sortTrackData();
    } catch (error) {
      console.error("Error modifying tracking data:", error);
    }
  }, [modifyIdxList]);

  return {
    shareTrackingImageData,
    saveTrackingImageData,
    handleAddModifyIdxList,
    handleSelectCancel,
    handleModifyTrack,
    handleDeleteTrack,
  };
};

export default useManageTrackData;
