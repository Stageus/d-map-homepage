import React from "react";
import open_in_tracking_page_icon from "../../assets/openInTrackingPage.svg";
import STYLE from "./style";
import useLoadTrackingImage from "./model/useLoadTrackingImage";
import ConfirmModal from "../../../../../../../../2_Widget/ConfirmModal";
import useIsModalOpen from "./model/useIsModalOpen";

const TrackingImageLoaderBtn = (props) => {
  const { data } = props;
  const [loadTrackingImage] = useLoadTrackingImage(data);
  const [isModalOpen, toggleModal] = useIsModalOpen();
  return (
    <>
      <STYLE.Button
        onClick={() => {
          toggleModal();
        }}
      >
        <STYLE.IconImg src={open_in_tracking_page_icon} alt="event btn" />
      </STYLE.Button>
      {isModalOpen ? (
        <ConfirmModal
          message={"현재 작업중인 트래킹은 삭제됩니다, 그래도 진행하시겠습니까?"}
          onConfirm={loadTrackingImage}
          onCancel={() => {
            toggleModal();
          }}
        />
      ) : null}
    </>
  );
};

export default TrackingImageLoaderBtn;
