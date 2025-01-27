import { useState, useEffect, useCallback } from "react";

const useManageTrackData = (
  trackingImageData = [],
  deleteTrackingImage,
  putTrackingImageToNotShare,
  putTrackingImageToShare
) => {
  const [trackData, setTrackData] = useState({ save: [], share: [] });
  const [modifyIdxList, setModifyIdxList] = useState([]);
  const [changeTrackingLength, setChangeTrackingLength] = useState({
    save: 0,
    share: 0,
  });

  const [memorizeTrackingImageData, setMemorizeTrackingImageData] =
    useState(null);

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
    const categorizedData = categorizeTrackData(combinedData);
    setTrackData(categorizedData);
    setMemorizeTrackingImageData(categorizedData);
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

  const sortTrackData = (trackData) => {
    return {
      save: [...trackData.save].sort((a, b) => b.idx - a.idx),
    };
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

  const updateSelectedTracks = useCallback((track, isDelete) => {
    if (!isDelete) toggleTrackData(track);
    setModifyIdxList((prev) => {
      const trackExists = prev.some((item) => item.idx === track.idx);
      return trackExists
        ? prev.filter((item) => item.idx !== track.idx)
        : [...prev, { idx: track.idx, sharing: track.sharing }];
    });
  }, []);

  const toggleTrackData = useCallback((target) => {
    setTrackData((prev) => {
      // 현재 대상 트랙이 있는 배열 찾기
      const isInSave = prev.save.some((track) => track.idx === target.idx);
      const isInShare = prev.share.some((track) => track.idx === target.idx);
      let updatedSave = [...prev.save];
      let updatedShare = [...prev.share];
      if (isInSave) {
        // save에서 share로 이동 (sharing 값 true로 변경)
        updatedSave = prev.save.filter((track) => track.idx !== target.idx);
        updatedShare = [...prev.share, { ...target, sharing: true }];
      } else if (isInShare) {
        // share에서 save로 이동 (sharing 값 false로 변경)
        updatedShare = prev.share.filter((track) => track.idx !== target.idx);
        updatedSave = [...prev.save, { ...target, sharing: false }];
      }
      return {
        save: sortTrackData(updatedSave),
        share: sortTrackData(updatedShare),
      };
    });
  }, []);

  // 선택 초기화
  const handleSelectCancel = useCallback(() => {
    setModifyIdxList([]);
    setTrackData(memorizeTrackingImageData);
  }, [memorizeTrackingImageData]);

  // 트래킹 데이터 수정 로직
  const handleModifyTrack = useCallback(() => {
    const idxToShare = modifyIdxList
      .filter((item) => !item.sharing)
      .map((item) => item.idx);
    const idxToNotShare = modifyIdxList
      .filter((item) => item.sharing)
      .map((item) => item.idx);

    putTrackingImageToShare(idxToShare);
    putTrackingImageToNotShare(idxToNotShare);

    setModifyIdxList([]);
    setMemorizeTrackingImageData(trackData);

    setChangeTrackingLength((prev) => ({
      share: prev.share + idxToNotShare.length - idxToShare.length,
      save: prev.save + idxToShare.length - idxToNotShare.length,
    }));
  }, [modifyIdxList]);

  const updateTrackingLength = (prev, modifyIdxList) => ({
    share: prev.share + modifyIdxList.filter((item) => item.sharing).length,
    save: prev.save + modifyIdxList.filter((item) => !item.sharing).length,
  });

  const filterTrackData = (prev, modifyIdxList) => ({
    save: prev.save.filter(
      ({ idx }) => !modifyIdxList.some((mod) => mod.idx === idx)
    ),
    share: prev.share.filter(
      ({ idx }) => !modifyIdxList.some((mod) => mod.idx === idx)
    ),
  });

  const handleDeleteTrack = useCallback(() => {
    const extractIdxList = (list) => list.map((item) => item.idx);
    const idxList = extractIdxList(modifyIdxList);
    deleteTrackingImage(idxList);
    setChangeTrackingLength((prev) =>
      updateTrackingLength(prev, modifyIdxList)
    );

    setTrackData((prev) => filterTrackData(prev, modifyIdxList));
    setMemorizeTrackingImageData(trackData);
    setModifyIdxList([]);
  }, [modifyIdxList]);

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
