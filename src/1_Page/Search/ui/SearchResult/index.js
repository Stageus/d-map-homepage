import React, { useEffect, useState } from "react";
import STYLE from "./style";
import TrackingImage from "../../../../2_Widget/TrackingImage";
import useGetResult from "./api/useGetResult";
import useTab from "./model/useTab";

const SearchResult = (props) => {
  const { text } = props;
  const { activeTab, handleTabName, handleTabLocation, handleGetPresentTab } =
    useTab();
  const { searchData, loading, error } = useGetResult(text, activeTab);

  return (
    <>
      <STYLE.TabContainer>
        <STYLE.TabBox>
          <STYLE.TabBackground $activeTabName={activeTab === "이름"} />
          <STYLE.Tab
            active={handleGetPresentTab("이름")}
            onClick={handleTabName}>
            이름
          </STYLE.Tab>
          <STYLE.Tab
            active={handleGetPresentTab("장소")}
            onClick={handleTabLocation}>
            장소
          </STYLE.Tab>
        </STYLE.TabBox>
      </STYLE.TabContainer>
      <STYLE.ResultList>
        {searchData?.length === 0 ? (
          <STYLE.EmptyMessage>없는 {activeTab}입니다.</STYLE.EmptyMessage>
        ) : handleGetPresentTab("이름") ? (
          searchData?.map((result) => (
            <>
              <img src="https://via.placeholder.com/150" alt="지도 미리보기" />
              <div>{result.nickname}</div>
            </>
          ))
        ) : (
          searchData?.map((result) => (
            <STYLE.MapPreview>
              <STYLE.Title>
                {result.idx}- {result.searchpoint}
              </STYLE.Title>
              <TrackingImage data={{ ...result, draggable: false }} />
            </STYLE.MapPreview>
          ))
        )}
      </STYLE.ResultList>
    </>
  );
};

export default SearchResult;
