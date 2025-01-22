import React from "react";
import CATEGORY from "../constant/category";
import TYPE from "../constant/type";

const useTrackingImageList = (
  type = TYPE.DEFAULT,
  category = CATEGORY.DEFAULT,
  page = 1,
  userIdx = 0
) => {
  const [trackingImageList, setTrackingImageList] = React.useState([]);

  /*
  1. 일단
    기본이랑, 유저의 거를 가져와가지고 ref 두개 만들어서 넣어
    타입따라서 state에 넣기 ㅇㅈ? 개깔끔스스


  */
};

export default useTrackingImageList;
