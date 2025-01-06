import STYLE from "./style";
import React from "react";
import useTrackingImageList from "../../3_Entity/SNS/useTrackingImageList";
import TrackingImagePost from "./ui/TrackingImagePost";
import { useParams } from "react-router-dom";
import useInfiniteScrollPaging from "./model/useInfiniteScrollPaging";
import { LoadScript } from "@react-google-maps/api";
const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
const Sns = () => {
  const [page, setPage] = React.useState(1);
  const { category, userIdx } = useParams();
  const [trackingImageList, trackingImageListLoading, hasMoreContent, numberOfTrackingImage] =
    useTrackingImageList(category, userIdx, page);
  const [ref] = useInfiniteScrollPaging(
    setPage,
    trackingImageListLoading,
    hasMoreContent
  );
  if (trackingImageList.length > 12) {
    const canvases = document.querySelectorAll("canvas");

    canvases.forEach((canvas) => {
      // canvas가 WebGL 컨텍스트를 가지고 있다면 초기화
      const context =
        canvas.getContext("webgl") || canvas.getContext("webgl2");

      if (context) {
        // WebGL 컨텍스트 초기화
        context.getExtension("WEBGL_lose_context")?.loseContext();
      }
    });
  }

  return (
    <STYLE.SnsPageContainer>
      <STYLE.Header>
        <STYLE.Date>2024.11.09 목</STYLE.Date>
        <STYLE.Sorting>
          <option value="good">좋아요순</option>
          <option value="recent">최신순</option>
        </STYLE.Sorting>
      </STYLE.Header>
      <STYLE.TrackingList>
        <LoadScript googleMapsApiKey={API_KEY}>
          {trackingImageList.map((elem, index) => {
            return (
              <STYLE.TrackingContainer key={index}>
                <STYLE.PostInfo
                  ref={index === numberOfTrackingImage - 1 ? ref : null}
                >
                  <STYLE.PosterName>홍길동</STYLE.PosterName>
                  <STYLE.PostUpdated>1달전 {index}</STYLE.PostUpdated>
                </STYLE.PostInfo>
                <TrackingImagePost data={{ ...elem, draggable: false }} />
              </STYLE.TrackingContainer>
            );
          })}
        </LoadScript>
      </STYLE.TrackingList>
    </STYLE.SnsPageContainer>
  );
};

export default Sns;
