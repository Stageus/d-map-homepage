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

  const paging = tabIndex === 0 ? page?.save : page?.share;
  const category = tabIndex === 0 ? 1 : 0;

  const { trackingImageList, loading, hasMoreContent } =
    useGetTrackingImageList(userIdx, paging, category);

  useEffect(() => {
    setTrackData(trackingImageList);
  }, [trackingImageList]);

  const { shareTrackingImageData, saveTrackingImageData } = useMemo(() => {
    return trackData?.reduce(
      (acc, item) => {
        if (item.sharing === true) {
          acc.shareTrackingImageData.push(item);
        } else {
          acc.saveTrackingImageData.push(item);
        }
        return acc;
      },
      { shareTrackingImageData: [], saveTrackingImageData: [] }
    );
  }, [trackData]); // trackData가 변경될 때만 계산

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
  const handleAddDeleteIdxList = (track) => {
    setModifyIdxList((pre) => {
      // 이미 포함되어 있다면 제거
      if (pre.includes(track)) {
        return pre.filter((item) => item !== track.idx);
      }
      // 포함되어 있지 않다면 추가
      return [...pre, track.idx];
    });
  };

  const handleScroll = useCallback((event) => {
    const container = event.target;
    const isBottom =
      container.scrollHeight - container.scrollTop - 1 <=
      container.clientHeight;

    if (isBottom) {
      handleNextPage();
    }
  }, []);
  const handleTrackDataLessCheck = (sharing) => {
    const data = sharing ? shareTrackingImageData : saveTrackingImageData;
    if ((data?.length || 0) <= 9) {
      handleNextPage();
    }
  };

  // 데이터 상태 초기화
  const handleSelectCancel = () => {
    setModifyIdxList([]);
    setTrackData(trackingImageList);
  };

  // 데이터 상태 변경 (수정)
  const handleAddModifyIdxList = (track) => {
    toggleModifyList(track);
    handleTrackDataLessCheck(track.sharing);
    setTrackData((prevData) => {
      return prevData.map((item) =>
        item.idx === track.idx ? { ...item, sharing: !item.sharing } : item
      );
    });
  };

  // 삭제 버튼 클릭 처리
  const handleDeleteTrack = useCallback(async () => {
    const result = await deleteTrackingImage(modifyIdxList);
    if (result) {
      setTrackData((pre) =>
        pre.filter((item) => !modifyIdxList.includes(item.idx))
      );
      handleTrackDataLessCheck();
      setModifyIdxList([]);
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
    shareTrackingImageData,
    saveTrackingImageData,
    handleAddModifyIdxList,
    handleAddDeleteIdxList,
    handleSelectCancel,
    handleModifyTrack,
    handleDeleteTrack,
    handleScroll,
  };
};

export default useManageTrackData;
