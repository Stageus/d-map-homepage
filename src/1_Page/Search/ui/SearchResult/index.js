import React, { useEffect, useState } from "react";
import STYLE from "./style";
import TrackingImage from "../../../../2_Widget/TrackingImage";
import useGetResult from "./api/useGetResult";
import useTab from "./model/useTab";
import { useNavigate } from "react-router-dom";

const SearchResult = (props) => {
  const { text } = props;
  const { activeTab, handleTabName, handleTabLocation, handleGetPresentTab } =
    useTab();
  const { searchData, loading, error } = useGetResult(text, activeTab);
  const navigate = useNavigate();
  const handleNavigate = (idx) => {
    navigate(`/profile/${idx}`); // idx를 기반으로 프로필 페이지로 이동
  };
  return (
    <>
      <STYLE.TabContainer>
        <STYLE.TabBox>
          <STYLE.TabBackground $activeTabName={handleGetPresentTab("이름")} />
          <STYLE.Tab
            $active={handleGetPresentTab("이름")}
            onClick={handleTabName}>
            이름
          </STYLE.Tab>
          <STYLE.Tab
            $active={handleGetPresentTab("장소")}
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
              <STYLE.NicckNameContainer
                onClick={() => {
                  handleNavigate(result.idx);
                }}>
                <STYLE.NickNameIcon alt="지도 미리보기" />
                <STYLE.NickNameText>{result.nickname}</STYLE.NickNameText>
              </STYLE.NicckNameContainer>
            </>
          ))
        ) : (
          searchData?.map((result) => (
            <STYLE.MapPreview
              onClick={() => {
                handleNavigate(result.idx);
              }}>
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
