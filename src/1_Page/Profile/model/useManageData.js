import { useState, useEffect, useCallback } from "react";

const useManageTrackData = (
  trackingImageData,
  deleteTrackingImage,
  putTrackingImageToNotShare,
  putTrackingImageToShare
) => {
  const [trackData, setTrackData] = useState({ save: [], share: [] });
  const [modifyIdxList, setModifyIdxList] = useState([]);
  const [changeSaveTrackingLength, setChangeSaveTrackingLength] = useState(0);
  const [changeShareTrackingLength, setChangeShareTrackingLength] = useState(0);

  // 트리거 state
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const [modifyTrigger, setModifyTrigger] = useState(false);

  // 트래킹 데이터 업데이트 및 중복 제거
  useEffect(() => {
    setTrackData({
      save: removeDuplicateData([...trackData.save, ...trackingImageData.save]),
      share: removeDuplicateData([
        ...trackData.share,
        ...trackingImageData.share,
      ]),
    });
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

  // 중복 제거 함수
  const removeDuplicateData = (data) => {
    return data.filter(
      (item, index, self) => index === self.findIndex((t) => t.idx === item.idx)
    );
  };

  // 선택된 데이터 토글
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
    setTrackData(trackingImageData);
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

    setChangeShareTrackingLength(
      (prev) => prev + idxToNotShare.length - idxToShare.length
    );
    setChangeSaveTrackingLength(
      (prev) => prev + idxToShare.length - idxToNotShare.length
    );
    handleSelectCancel();
  }, [modifyIdxList, handleSelectCancel]);

  // 트래킹 데이터 삭제 로직
  const handleDeleteTrack = useCallback(async () => {
    const idxList = modifyIdxList.map((item) => item.idx);
    await deleteTrackingImage(idxList);
    setChangeShareTrackingLength(
      (prev) => prev + modifyIdxList.filter((item) => item.sharing).length
    );
    setChangeSaveTrackingLength(
      (prev) => prev + modifyIdxList.filter((item) => !item.sharing).length
    );
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
    modifyIdxList,
    setDeleteTrigger, // 삭제 트리거 핸들러 제공
    setModifyTrigger, // 수정 트리거 핸들러 제공
    toggleModifyIdxList,
    handleSelectCancel,
    changeShareTrackingLength,
    changeSaveTrackingLength,
  ];
};

export default useManageTrackData;
