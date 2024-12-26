import React, { useState } from "react";
import STYLE from "./style";

const SearchResult = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("이름");

  const handleSearch = () => {
    // 검색 로직 예제
    if (query === "김재걸") {
      if (activeTab === "이름") {
        setResults(new Array(5).fill("김재걸"));
      } else if (activeTab === "장소") {
        setResults([
          { name: "김재걸", location: "미추홀구" },
          { name: "김재걸2", location: "미추홀구" },
        ]);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <>
      <STYLE.TabContainer>
        <STYLE.TabBox>
          <STYLE.TabBackground $activeTabName={activeTab === "이름"} />
          <STYLE.Tab
            active={activeTab === "이름"}
            onClick={() => setActiveTab("이름")}>
            이름
          </STYLE.Tab>
          <STYLE.Tab
            active={activeTab === "장소"}
            onClick={() => setActiveTab("장소")}>
            장소
          </STYLE.Tab>
        </STYLE.TabBox>
      </STYLE.TabContainer>
      <STYLE.ResultList>
        {results.length === 0 ? (
          <STYLE.EmptyMessage>없는 이름입니다.</STYLE.EmptyMessage>
        ) : activeTab === "이름" ? (
          results.map((name, index) => (
            <STYLE.ResultItem key={index}>
              <div className="profile" />
              <span>{name}</span>
              <button>···</button>
            </STYLE.ResultItem>
          ))
        ) : (
          results.map((result) => (
            <STYLE.MapPreview>
              <div>
                {result.name} - {result.location}
              </div>
              <img src="https://via.placeholder.com/150" alt="지도 미리보기" />
            </STYLE.MapPreview>
          ))
        )}
      </STYLE.ResultList>
    </>
  );
};

export default SearchResult;
