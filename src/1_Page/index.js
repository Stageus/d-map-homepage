import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sns from "./Sns";
import Profile from "./Profile";
import Login from "./Login";
import Search from "./Search";
import Setting from "./Setting";
import Tracking from "./Tracking";
import OAuthRedirect from "./OAuthRedirect";
import STYLE from "./style";

const Page = () => {
  return (
    <STYLE.Main>
      <Routes>
        <Route path="/" element={<Navigate to={"/sns"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:userIdx" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/sns" element={<Sns />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/auth/callback" element={<OAuthRedirect />} />
        {/* <Route path="*" element={} /> 에러 페이지 추가 예정 */}
      </Routes>
    </STYLE.Main>
  );
};

export default React.memo(Page);
