import STYLE from "./style";
import React from "react";
import LikeBtn from "./ui/LikeBtn";
import DetailModalBtn from "./ui/DetailModalBtn";
import NavigateBtn from "./ui/NavigateBtn";
import useDetailModal from "./model/useDetailModal";
import TrackingImage from "../../../../2_Widget/TrackingImage";
const TrackingImageActions = (props) => {
  const { data } = props;
  const { likecount } = data;
  const [viewDetailModal, toggleDetailModal] = useDetailModal();
  return (
    <>
      <STYLE.InfoContainer>
        <p>좋아요: {likecount}</p>
        <STYLE.BtnContainer>
          <LikeBtn />
          <DetailModalBtn clickEvent={toggleDetailModal} />
          <NavigateBtn />
          {/* 여기서, 현재 트래킹이미지의 line 데이터를 recoil atom에 반영하고 tracking page로 이동해야함 */}
        </STYLE.BtnContainer>
      </STYLE.InfoContainer>

      <STYLE.DetailModal isOpen={viewDetailModal}>
        <TrackingImage data={{ ...data, height: "100%" }} />
        {/* 상세보기 모달에 z-index 1 */}
        <STYLE.Button
          onClick={() => {
            toggleDetailModal();
          }}
        >
          X
        </STYLE.Button>
      </STYLE.DetailModal>

    </>
  );
};

export default TrackingImageActions;
