import React, { useEffect, useRef, useState } from "react";

const useManageWebGL = (tabIndex, page, divElement, scrollPosition) => {
  const postFirstTabRef = useRef(null); // 첫 번째 탭 div 참조
  const postSecondTabRef = useRef(null); // 두 번째 탭 div 참조
  const isScrolling = useRef(false); // 스크롤 중인지 여부 플래그
  const scrollTimeout = useRef(null); // 스크롤 타이머 참조

  const [isScroll, setIsScroll] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const initializeWebGL = () => {
    const canvases = document.querySelectorAll("canvas");
    if (canvases.length === 0) {
      console.warn("초기화할 WebGL 캔버스가 없습니다.");
      return;
    }

    canvases.forEach((canvas) => {
      const context = canvas.getContext("webgl") || canvas.getContext("webgl2");
      if (context) {
        const loseExtension = context.getExtension("WEBGL_lose_context");
        if (loseExtension) {
          try {
            loseExtension.loseContext(); // WebGL 컨텍스트 손실
            console.log("WebGL 컨텍스트 손실 처리 완료");
          } catch (error) {
            console.error("WebGL 초기화 중 오류 발생:", error.message);
          }
        }
      }
    });
  };

  const restoreWebGL = () => {
    const canvases = document.querySelectorAll("canvas");
    if (canvases.length === 0) {
      console.warn("복원할 WebGL 캔버스가 없습니다.");
      return;
    }

    canvases.forEach((canvas) => {
      const context = canvas.getContext("webgl") || canvas.getContext("webgl2");
      if (context) {
        const loseExtension = context.getExtension("WEBGL_lose_context");
        if (loseExtension) {
          try {
            loseExtension.restoreContext(); // WebGL 컨텍스트 복원
            console.log("WebGL 컨텍스트 복원 완료");
          } catch (error) {
            console.error("WebGL 복원 중 오류 발생:", error.message);
          }
        }
      }
    });
  };

  useEffect(() => {
    // console.log(tabIndex, "탭");

    let tabDivElement = null; // 현재 탭의 div를 담을 변수

    // tabIndex에 따라 참조할 div 선택
    if (tabIndex === 0) {
      tabDivElement = postFirstTabRef.current;
      divElement.current = postFirstTabRef.current; // 첫 번째 탭의 DOM 요소 참조
    } else {
      tabDivElement = postSecondTabRef.current;
      divElement.current = postSecondTabRef.current; // 첫 번째 탭의 DOM 요소 참조
    }

    // div가 없으면 실행 중단

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current); // 기존 타이머 정리
      }

      if (!isScrolling.current) {
        isScrolling.current = true;
        setIsScroll(true);
      }
      // initializeWebGL();

      // };// 스크롤 멈춤 처리
      const scroolStopEvent = () => {
        scrollTimeout.current = setTimeout(() => {
          isScrolling.current = false;
          // 스크롤 고정
          // 2.3초 후 스크롤 활성화
          setIsScroll(false);
          // setIsLoaded(true);
        }, 300);
      };
      scroolStopEvent();
    };

    // 선택된 div에 스크롤 이벤트 등록
    tabDivElement.addEventListener("scroll", handleScroll);

    // 정리(cleanup) 함수
    return () => {
      tabDivElement.removeEventListener("scroll", handleScroll); // 이벤트 해제
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current); // 타이머 해제
      }
    };
  }, [tabIndex]); // tabIndex 변경 시마다 실행

  useEffect(() => {
    // console.log("페이지");
    let tabDivElement = null; // 현재 탭의 div를 담을 변수

    // tabIndex에 따라 참조할 div 선택
    if (tabIndex === 0) {
      tabDivElement = postFirstTabRef.current;
      divElement.current = postFirstTabRef.current; // 첫 번째 탭의 DOM 요소 참조
    } else {
      tabDivElement = postSecondTabRef.current;
      divElement.current = postSecondTabRef.current; // 첫 번째 탭의 DOM 요소 참조
    }

    console.log(scrollPosition.current, "적용");
    tabDivElement.scrollTo(0, scrollPosition.current);

    // const scroolStopEvent = () => {
    //   scrollTimeout.current = setTimeout(() => {
    //     isScrolling.current = false;
    //     // 스크롤 고정
    //     tabDivElement.style.overflow = "hidden";
    //     // 2.3초 후 스크롤 활성화
    //     setIsScroll(false);
    //     setIsLoaded(true);

    //     setTimeout(() => {
    //       tabDivElement.style.overflow = "auto";
    //       setIsLoaded(false);
    //     }, 2300);
    //   }, 300);
    // };
    const scroolStopEvent = () => {
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
        // 스크롤 고정
        // 2.3초 후 스크롤 활성화
        setIsScroll(false);
        // setIsLoaded(true);
      }, 300);
    };
    scroolStopEvent();
  }, [page]);

  return { postFirstTabRef, postSecondTabRef, isScroll, isLoaded }; // ref를 반환하여 div에 연결
};

export default useManageWebGL;
