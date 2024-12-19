import React from "react";
import TrackingImage from "../../../../2_Widget/TrackingImage";
import STYLE from "./style";
import icon from "./assets/gear-solid.svg"

const TrackingList = () => {
  const trackingList = {
    message: [
      {
        idx: 123,
        line: [
          [
            { lat: 37.57, lng: 126.97 },
            { lat: 37.5709, lng: 126.975 },
            { lat: 37.5719, lng: 126.9741 },
            { lat: 37.5724, lng: 126.969 },
            { lat: 37.5714, lng: 126.964 },
            { lat: 37.57, lng: 126.97 },
          ],
          [
            { lat: 37.57, lng: 126.97 },
            { lat: 37.571, lng: 126.975 },
            { lat: 37.572, lng: 126.97 },
            { lat: 37.57, lng: 126.97 },
          ],
          [
            { lat: 37.57, lng: 126.97 },
            { lat: 37.57, lng: 126.975 },
            { lat: 37.571, lng: 126.975 },
            { lat: 37.571, lng: 126.97 },
            { lat: 37.57, lng: 126.97 },
          ],
        ],
        searchpoint: "서울시 종로구",
        center: { lat: 37.57, lng: 126.97 },
        zoom: 14,
        heading: 250,
        sharing: 0,
        likecount: 121,
        color: 0,
        thickness: 15,
        background: 0,
      },
      {
        idx: 131,
        line: [
          [
            { lat: 37.57, lng: 126.97 },
            { lat: 37.5715, lng: 126.973 },
            { lat: 37.5725, lng: 126.975 },
            { lat: 37.5715, lng: 126.977 },
            { lat: 37.57, lng: 126.976 },
            { lat: 37.57, lng: 126.97 },
          ],
          [
            { lat: 37.57, lng: 126.97 },
            { lat: 37.5715, lng: 126.975 },
            { lat: 37.572, lng: 126.97 },
            { lat: 37.57, lng: 126.97 },
          ],
          [
            { lat: 37.57, lng: 126.97 },
            { lat: 37.57, lng: 126.975 },
            { lat: 37.571, lng: 126.975 },
            { lat: 37.571, lng: 126.97 },
            { lat: 37.57, lng: 126.97 },
          ],
        ],
        searchpoint: "인천광역시 미추홀구",
        center: { lat: 37.57, lng: 126.97 },
        zoom: 15,
        heading: 250,
        sharing: 0,
        likecount: 223,
        color: 0,
        thickness: 15,
        background: 0,
      },
    ],
  };
  return (
    <STYLE.TrackingList>
      {trackingList.message.map((elem) => {
        return (
          <STYLE.TrackingContainer>
            <STYLE.PostInfo>
              <STYLE.PosterName>홍길동</STYLE.PosterName>
              <STYLE.PostUpdated>1달전</STYLE.PostUpdated>
            </STYLE.PostInfo>
            <TrackingImage data={elem} />
            <STYLE.InfoContainer>
              <p>좋아요: {123}</p>
              <STYLE.IconContainer>
                <STYLE.Icon src={icon}/>
                <STYLE.Icon src={icon}/>
                <STYLE.Icon src={icon}/>
                <STYLE.Icon src={icon}/>
              </STYLE.IconContainer>
            </STYLE.InfoContainer>
          </STYLE.TrackingContainer>
        );
      })}
    </STYLE.TrackingList>
  );
};

export default TrackingList;
