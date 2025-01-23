import React from "react";
import { GoogleMap, Polyline } from "@react-google-maps/api";
import useDetailModal from "./model/useDetailModal";
import detail_icon from "./assets/detail.svg";
import like_icon from "./assets/like.svg";
import unlike_icon from "./assets/unlike.svg";
import EventBtn from "./ui/EventBtn";
import useToggleLikeTrackingImage from "./model/useToggleLikeTrackingImage";
import STYLE from "./style";
import TrackingImageLoaderBtn from "./ui/TrackingImageLoaderBtn";
import MAPTYPE from "../../../../4_Shared/constant/mapType";
import staticMapUrlGenerater from "../../../../4_Shared/lib/staticMapUrlGenerater";

const TrackingImagePost = React.memo((props) => {
  const { data } = props;
  const {
    likecount,
    idx,
    liked_by_user,
    img_url,
    nickname,
    searchpoint,
    zoom,
    center,
    heading,
    line,
    background,
    color,
    thickness,
  } = data;
  const [viewDetailModal, toggleDetailModal] = useDetailModal();
  const [like, toggleLikeTrackingImage] = useToggleLikeTrackingImage(
    idx,
    liked_by_user
  );
  return (
    <STYLE.Container>
      <STYLE.PostInfo>
        <STYLE.PosterInfoContainer>
          <STYLE.ProfileImage src={img_url} alt="profile image" />
          <STYLE.PosterName>{nickname}</STYLE.PosterName>
        </STYLE.PosterInfoContainer>

        <STYLE.SearchPoint>{searchpoint}</STYLE.SearchPoint>
      </STYLE.PostInfo>
      <STYLE.TrackingImageWrapper
        onDoubleClick={() => {
          toggleLikeTrackingImage();
        }}
      >
        <STYLE.StaticMapWrapper>
          <STYLE.StaticMapImage
            src={staticMapUrlGenerater({
              ...data,
              mapWidth: "500",
              mapHeight: "700",
            })}
            alt="Tracking Map"
          />
        </STYLE.StaticMapWrapper>
      </STYLE.TrackingImageWrapper>

      <STYLE.InfoContainer>
        <p>좋아요: {likecount}</p>
        <STYLE.BtnContainer>
          <EventBtn
            icon={like ? like_icon : unlike_icon}
            clickEvent={toggleLikeTrackingImage}
          />
          <EventBtn icon={detail_icon} clickEvent={toggleDetailModal} />
          <TrackingImageLoaderBtn data={data} />
        </STYLE.BtnContainer>
      </STYLE.InfoContainer>

      {viewDetailModal && (
        <STYLE.DetailModal>
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "100%",
            }}
            options={{
              zoom: zoom,
              center: center,
              heading: heading, // 지도 회전 각도 설정 (0 ~ 360)
              disableDefaultUI: true, // UI 요소 비활성화
              mapTypeId: MAPTYPE[background],
            }}
          >
            {/* 선 그리기 */}
            {line.map((elem, index) => {
              return (
                <Polyline
                  path={elem}
                  options={{
                    strokeColor: color, // 빨간색 선
                    strokeOpacity: 0.8,
                    strokeWeight: thickness,
                  }}
                  key={index}
                />
              );
            })}
          </GoogleMap>

          {/* 상세보기 모달에 z-index 1 */}
          <STYLE.Button
            onClick={() => {
              toggleDetailModal();
            }}
          >
            X
          </STYLE.Button>
          <STYLE.DetailModalSearchPoint>
            {searchpoint}
          </STYLE.DetailModalSearchPoint>
        </STYLE.DetailModal>
      )}
    </STYLE.Container>
  );
});

export default TrackingImagePost;
