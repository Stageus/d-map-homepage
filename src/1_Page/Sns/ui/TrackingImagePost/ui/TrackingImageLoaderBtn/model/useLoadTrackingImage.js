import { useNavigate } from "react-router-dom";
import useTrackingDataAtom from "../../../../../../../4_Shared/Recoil/useTrackingDataAtom";
import useTrackingLineAtom from "../../../../../../../4_Shared/Recoil/useTrackingLineAtom";

const useLoadTrackingImage = (trackingImageData) => {
  const { center, zoom, heading, line, background, color, thickness, searchpoint } = trackingImageData;
  const navigate = useNavigate();
  const [, setTrackingData] = useTrackingDataAtom();
  const [, setTrackingLine] = useTrackingLineAtom();

  const loadTrackingImage = () => {
    setTrackingData({
      idx: -1,
      zoom: zoom,
      center: center,
      heading: heading,
      background: background,
      color: color,
      thickness: thickness,
      searchpoint: searchpoint,
      sharing: false,
    });
    setTrackingLine(line);
    navigate("/tracking");
  };

  return [loadTrackingImage];
};

export default useLoadTrackingImage;
