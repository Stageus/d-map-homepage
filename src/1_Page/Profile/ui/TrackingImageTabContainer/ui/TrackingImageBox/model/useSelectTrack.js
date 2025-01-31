import { moveTrack, sortTrackData } from "../lib/profileUtil";

const useSelectTrack = (setDisplayTrackingImage, setModifyIdxList) => {
  const clickTrackEvent = (track, isDelete) => {
    if (!isDelete) {
      setDisplayTrackingImage((prev) => {
        const { private: privateList, public: publicList } = prev;
        const isInPrivate = privateList.some(
          (prevTrack) => prevTrack.idx === track.idx
        );

        const { updatedFrom, updatedTo } = isInPrivate
          ? moveTrack(track, privateList, publicList, true)
          : moveTrack(track, publicList, privateList, false);

        // 정렬된 리스트 반환
        return {
          private: sortTrackData(isInPrivate ? updatedFrom : updatedTo),
          public: sortTrackData(isInPrivate ? updatedTo : updatedFrom),
        };
      });
    }

    // 선택된 트랙 리스트 업데이트
    setModifyIdxList((prev) => {
      const isAlreadySelected = prev.some((item) => item.idx === track.idx);
      return isAlreadySelected
        ? prev.filter((item) => item.idx !== track.idx)
        : [...prev, { idx: track.idx, sharing: track.sharing }];
    });
  };

  return [clickTrackEvent];
};

export default useSelectTrack;
