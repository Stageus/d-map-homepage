import { useNavigate } from "react-router-dom";
import useTrackingDataAtom from "../../../../../../../4_Shared/Recoil/useTrackingDataAtom";
import useTrackingLineAtom from "../../../../../../../4_Shared/Recoil/useTrackingLineAtom";

const useLoadTrackingImage = (trackingImageData) => {
  const { center, zoom, heading, line } = trackingImageData;
  const navigate = useNavigate();
  const [, setTrackingData] = useTrackingDataAtom();
  const [, setTrackingLine] = useTrackingLineAtom();

  const loadTrackingImage = () => {
    setTrackingData({ zoom: zoom, center: center, heading: heading });
    setTrackingLine(line);
    navigate("/tracking");
  };

  return [loadTrackingImage];
};

export default useLoadTrackingImage;
