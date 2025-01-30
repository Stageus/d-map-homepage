// 트래킹 길이 계산 함수
export const calculateAdjustedTrackingLengths = (
  userInfo,
  changeLength = {}
) => {
  const { share_tracking_length = 0, total_tracking_length = 0 } =
    userInfo || {}; // userInfo가 null일 수도 있으니 기본값 처리

  return {
    share: Math.max(0, share_tracking_length - (changeLength.share || 0)), // 음수 방지
    save: Math.max(
      0,
      total_tracking_length - share_tracking_length - (changeLength.save || 0)
    ), // 음수 방지
  };
};
