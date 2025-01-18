import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import useGetTrackingImageList from "../../../3_Entity/Tracking/useGetTrackingImageList";
import putTrackingToShare from "../../../3_Entity/Tracking/putTrackingImageToShare";
import putTrackingToNotShare from "../../../3_Entity/Tracking/putTrackingImageToNotShare";
import deleteTrackingImage from "../../../3_Entity/Tracking/deleteTrackingImage";
import { useParams } from "react-router-dom";

const useManageTrackData = (tabIndex) => {
  const { userIdx } = useParams();

  const [page, setPage] = useState({ save: 1, share: 1 });
  const [trackData, setTrackData] = useState([]);
  const [modifyIdxList, setModifyIdxList] = useState([]);

  const isShareTab = tabIndex === 0; // Boolean으로 처리
  const category = isShareTab ? 1 : 0;
  const paging = isShareTab ? page.share : page.save;

  const { trackingImageList, loading, hasMoreContent } =
    useGetTrackingImageList(userIdx, paging, category);

  // 트래킹 데이터 상태 관리
  useEffect(() => {
    setTrackData(trackingImageList || []);
  }, [trackingImageList]);

  const trackingImageDataList = useMemo(() => {
    return trackData.reduce(
      (acc, item) => {
        acc[item.sharing ? "share" : "save"].push(item);
        return acc;
      },
      { share: [], save: [] }
    );
  }, [trackData]);

  // hasMoreContent 상태 업데이트
  const hasMoreContentRef = useRef(hasMoreContent);
  useEffect(() => {
    hasMoreContentRef.current = hasMoreContent;
  }, [hasMoreContent]);

  const handleNextPage = useCallback(() => {
    const hasMoreContent = isShareTab
      ? hasMoreContentRef.current.share
      : hasMoreContentRef.current.save;
    if (!hasMoreContent) return;
    setPage((prev) => ({
      ...prev,
      [isShareTab ? "share" : "save"]: prev[isShareTab ? "share" : "save"] + 1,
    }));
  }, [isShareTab]);

  // 데이터 길이 확인 후 페이지 추가
  const checkAndFetchMore = useCallback(() => {
    const currentData = isShareTab
      ? trackingImageDataList.share
      : trackingImageDataList.save;
    if ((currentData?.length || 0) <= 9) handleNextPage();
  }, [isShareTab, trackingImageDataList, handleNextPage]);

  // 데이터 정렬
  const sortTrackData = useCallback(() => {
    setTrackData((prev) =>
      [...prev].sort((a, b) => new Date(b.userIdx) - new Date(a.userIdx))
    );
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

      checkAndFetchMore();
      sortTrackData();
      deleteRepeatData();
    },
    [toggleModifyIdxList, checkAndFetchMore, sortTrackData, deleteRepeatData]
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
      checkAndFetchMore();
      sortTrackData();
    }
  }, [modifyIdxList, checkAndFetchMore, sortTrackData]);

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
    } catch (error) {
      console.error("Error modifying tracking data:", error);
    }
  }, [modifyIdxList]);

  // 스크롤 처리
  const handleScroll = useCallback(
    (event) => {
      const container = event.target;
      if (
        container.scrollHeight - container.scrollTop - 1 <=
        container.clientHeight
      ) {
        handleNextPage();
      }
    },
    [handleNextPage]
  );

  return {
    shareTrackingImageData: trackingImageDataList.share,
    saveTrackingImageData: trackingImageDataList.save,
    handleAddModifyIdxList,
    handleSelectCancel,
    handleModifyTrack,
    handleDeleteTrack,
    handleScroll,
    loading,
  };
};

export default useManageTrackData;
