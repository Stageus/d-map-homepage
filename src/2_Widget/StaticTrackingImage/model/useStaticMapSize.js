import React from "react";

const useStaticMapSize = (mapWrapperRef) => {
  const [mapSize, setMapSize] = React.useState({
    width: "100",
    height: "100",
  });

  React.useEffect(() => {
    // 부모 요소 크기 측정 함수
    if (mapWrapperRef.current) {
      const { offsetWidth, offsetHeight } = mapWrapperRef.current;

      setMapSize({
        width: offsetWidth,
        height: offsetHeight,
      });
    }
  }, [mapWrapperRef]);

  return [mapSize.width, mapSize.height];
};

export default useStaticMapSize;
