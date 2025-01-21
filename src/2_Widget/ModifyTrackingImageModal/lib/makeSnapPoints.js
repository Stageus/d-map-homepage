const makeSnapPoints = (elementRef, snap) => {
  const snapPoints = [0];
  const screenHeight = window.innerHeight;

  snap.forEach((item) => {
    snapPoints.push(-screenHeight * item);
  });

  // 요소 높이를 기반으로 스냅 포인트 설정
  if (elementRef.current) {
    const elementHeight = elementRef.current.offsetHeight;

    // 최대 translateY 계산
    const maxTranslateY = -(screenHeight - elementHeight);
    snap.forEach((item) => {
      snapPoints.push(-screenHeight * item);
    });

    if (!snapPoints.includes(maxTranslateY)) {
      snapPoints.push(maxTranslateY + 5);
    }

    snapPoints.sort((a, b) => a - b);
  }
  return snapPoints;
};

export default makeSnapPoints;
