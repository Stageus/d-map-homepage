import { useEffect, useState, useCallback, useRef } from "react";
import useGetTrackingImageList from "../../../3_Entity/Tracking/useGetTrackingImageList";
import putTrackingToShare from "../../../3_Entity/Tracking/putTrackingImageToShare";
import putTrackingToNotShare from "../../../3_Entity/Tracking/putTrackingImageToNotShare";
import deleteTrackingImage from "../../../3_Entity/Tracking/deleteTrackingImage";
import { useParams } from "react-router-dom";

const useManageTrackData = (tabIndex) => {
  const { userIdx } = useParams();

  const [page, setPage] = useState({ save: 1, share: 1 });

  const [trackData, setTrackData] = useState({
    save: [],
    share: [],
  });

  const [modifyIdxList, setModifyIdxList] = useState([]);

  const paging = tabIndex === 0 ? page?.save : page?.share;
  const category = tabIndex === 0 ? 1 : 0;

  const { trackingImageList, loading, hasMoreContent } =
    useGetTrackingImageList(userIdx, paging, category);

  useEffect(() => {
    console.log(hasMoreContent);
  }, [hasMoreContent]);

  useEffect(() => {
    setTrackData(trackingImageList);
  }, [trackingImageList]);

  const hasMoreContentRef = useRef(hasMoreContent);

  useEffect(() => {
    hasMoreContentRef.current = hasMoreContent;
  }, [hasMoreContent, loading, tabIndex]);
  // 페이지 추가함수
  const handleNextPage = useCallback(() => {
    const hasMoreContentPaging =
      tabIndex === 0
        ? hasMoreContentRef.current.share
        : hasMoreContentRef.current.save;

    if (!hasMoreContentPaging) return;

    setPage((prev) => ({
      ...prev,
      save: tabIndex === 0 ? prev.save + 1 : prev.save,
      share: tabIndex === 1 ? prev.share + 1 : prev.share,
    }));
  }, [hasMoreContent.share, hasMoreContent.save, tabIndex]);

  // 수정 및 삭제 시 선택된 데이터 관리
  const toggleModifyList = (track) => {
    setModifyIdxList((prev) =>
      prev.some((item) => item.idx === track.idx)
        ? prev.filter((item) => item.idx !== track.idx)
        : [...prev, { idx: track.idx, sharing: track.sharing }]
    );
  };

  // 데이터 상태 초기화
  const handleSelectCancel = () => {
    setModifyIdxList([]);
    setTrackData(trackingImageList);
  };

  // 데이터 상태 변경 (수정)
  const handleToggleTrackType = (track) => {
    toggleModifyList(track);
    setTrackData((prevData) =>
      prevData.map((item) =>
        item.idx === track.idx ? { ...item, sharing: !item.sharing } : item
      )
    );
  };

  // 삭제 버튼 클릭 처리
  const handleDeleteTrack = useCallback(async () => {
    try {
      await deleteTrackingImage(modifyIdxList.map((item) => item.idx));
      setModifyIdxList([]);
    } catch (error) {
      console.error("Error deleting tracking data:", error);
    }
  }, [modifyIdxList]);

  // 수정 버튼 클릭 처리
  const handleModifyTrack = useCallback(async () => {
    try {
      const groupedBySharing = modifyIdxList.reduce(
        (acc, item) => {
          acc[item.sharing ? "toNotshare" : "toShare"].push(item.idx);
          return acc;
        },
        { toShare: [], toNotshare: [] }
      );

      if (groupedBySharing.toShare.length > 0) {
        await putTrackingToShare(groupedBySharing.toShare);
      }
      if (groupedBySharing.toNotshare.length > 0) {
        await putTrackingToNotShare(groupedBySharing.toNotshare);
      }
      setModifyIdxList([]);
    } catch (error) {
      console.error("Error modifying tracking data:", error);
    }
  }, [modifyIdxList]);

  return {
    trackData,
    handleToggleTrackType,
    handleSelectCancel,
    handleModifyTrack,
    handleDeleteTrack,
    toggleModifyList,
    handleNextPage,
  };
};

export default useManageTrackData;
