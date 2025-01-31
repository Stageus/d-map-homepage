// 공유 및 비공유 인덱스를 추출하는 유틸리티 함수
export const extractIdxLists = (list) => {
  return list.reduce(
    (acc, item) => {
      if (item.sharing) {
        acc.idxToNotShare.push(item.idx);
      } else {
        acc.idxToShare.push(item.idx);
      }
      return acc;
    },
    { idxToShare: [], idxToNotShare: [] }
  );
};

// 트래킹 데이터를 공유/비공유 상태로 분류하는 함수
export const categorizeTrackData = (data) => {
  return {
    private: data.filter((item) => !item.sharing), // sharing이 false인 경우
    public: data.filter((item) => item.sharing), // sharing이 true인 경우
  };
};

// 중복 제거 함수
export const removeDuplicateData = (data) => {
  return data.filter(
    (item, index, self) => index === self.findIndex((t) => t.idx === item.idx)
  );
};
// 트래킹 데이터를 필터링하는 함수
export const filterTrackData = (prev, idxList) => {
  const idxListSet = new Set(idxList.map((idx) => idx));
  return {
    private: prev.private.filter(({ idx }) => !idxListSet.has(idx)),
    public: prev.public.filter(({ idx }) => !idxListSet.has(idx)),
  };
};
