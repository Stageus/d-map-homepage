import STYLE from "./style";
import React from "react";
import TrackingList from "./ui/TrackingImageList";
const Sns = () => {
  return (
    <STYLE.Main>
      <STYLE.Header>
        <STYLE.Date>2024.11.09 목</STYLE.Date>
        <STYLE.Sorting>
          <option value="good">좋아요순</option>
          <option value="recent">최신순</option>
        </STYLE.Sorting>
      </STYLE.Header>
      <TrackingList />
    </STYLE.Main>
  );
};

export default Sns;
