import { useState, useEffect, useCallback } from "react";
import useDeleteTrackingImage from "../../../3_Entity/Tracking/useDeleteTrackingImage.js";
import usePutTrackingImageToNotShare from "../../../3_Entity/Tracking/usePutTrackingImageToNotShare.js";
import usePutTrackingImageToShare from "../../3_Entity/Tracking/usePutTrackingImageToShare.js";

const useManageTrackData = (trackingImageData = []) => {
  const [deleteTrackingImage] = useDeleteTrackingImage();
  const [putTrackingImageToNotShare] = usePutTrackingImageToNotShare();
  const [putTrackingImageToShare] = usePutTrackingImageToShare();

  const [trackData, setTrackData] = useState({ save: [], share: [] });
  const [modifyIdxList, setModifyIdxList] = useState([]);
  const [changeTrackingLength, setChangeTrackingLength] = useState({
    save: 0,
    share: 0,
  });

  // 트리거 state
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const [modifyTrigger, setModifyTrigger] = useState(false);

  useEffect(() => {
    // 모든 데이터를 하나의 배열로 통합 후 중복 제거
    const combinedData = removeDuplicateData([
      ...trackData.save,
      ...trackData.share,
      ...trackingImageData,
    ]);
    // sharing 속성을 기준으로 다시 분류
    const categorizedData = {
      save: combinedData.filter((item) => !item.sharing),
      share: combinedData.filter((item) => item.sharing),
    };

    setTrackData(categorizedData);
  }, [trackingImageData]);

  // 트래킹 데이터를 공유/비공유 상태로 분류하는 함수
  const categorizeTrackData = (data) => {
    return {
      save: data.filter((item) => !item.sharing), // sharing이 false인 경우
      share: data.filter((item) => item.sharing), // sharing이 true인 경우
    };
  };

  // 중복 제거 함수
  const removeDuplicateData = (data) => {
    return data.filter(
      (item, index, self) => index === self.findIndex((t) => t.idx === item.idx)
    );
  };

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

  // 선택된 데이터 토글
  const updateSelectedTracks = useCallback((track) => {
    setModifyIdxList((prev) =>
      prev.some((item) => item.idx === track.idx)
        ? prev.filter((item) => item.idx !== track.idx)
        : [...prev, { idx: track.idx, sharing: track.sharing }]
    );
  }, []);

  // 선택 초기화
  const handleSelectCancel = useCallback(() => {
    setModifyIdxList([]);
    setTrackData(categorizeTrackData(trackingImageData));
  }, [trackingImageData]);

  // 트래킹 데이터 수정 로직
  const handleModifyTrack = useCallback(async () => {
    const idxToShare = modifyIdxList
      .filter((item) => !item.sharing)
      .map((item) => item.idx);
    const idxToNotShare = modifyIdxList
      .filter((item) => item.sharing)
      .map((item) => item.idx);

    await putTrackingImageToShare(idxToShare);
    await putTrackingImageToNotShare(idxToNotShare);

    setModifyIdxList([]);
    setTrackData((prev) => ({
      save: prev.save
        .filter(({ idx }) => !idxToShare.includes(idx))
        .concat(prev.share.filter(({ idx }) => idxToNotShare.includes(idx))),
      share: prev.share
        .filter(({ idx }) => !idxToNotShare.includes(idx))
        .concat(prev.save.filter(({ idx }) => idxToShare.includes(idx))),
    }));

    setChangeTrackingLength((prev) => ({
      share: prev.share + idxToNotShare.length - idxToShare.length,
      save: prev.save + idxToShare.length - idxToNotShare.length,
    }));

    handleSelectCancel();
  }, [modifyIdxList, handleSelectCancel]);

  // 트래킹 데이터 삭제 로직
  const handleDeleteTrack = useCallback(async () => {
    const idxList = modifyIdxList.map((item) => item.idx);
    await deleteTrackingImage(idxList);

    setChangeTrackingLength((prev) => ({
      share: prev.share + modifyIdxList.filter((item) => item.sharing).length,
      save: prev.save + modifyIdxList.filter((item) => !item.sharing).length,
    }));

    setTrackData((prev) => ({
      save: prev.save.filter(
        ({ idx }) => !modifyIdxList.some((mod) => mod.idx === idx)
      ),
      share: prev.share.filter(
        ({ idx }) => !modifyIdxList.some((mod) => mod.idx === idx)
      ),
    }));

    setModifyIdxList([]);
    handleSelectCancel();
  }, [modifyIdxList, handleSelectCancel]);

  return [
    trackData,
    changeTrackingLength,
    modifyIdxList,
    setDeleteTrigger, // 삭제 트리거 핸들러 제공
    setModifyTrigger, // 수정 트리거 핸들러 제공
    updateSelectedTracks,
    handleSelectCancel,
  ];
};

export default useManageTrackData;
