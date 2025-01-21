import { Polyline } from "@react-google-maps/api";
import useTrackingLine from "./model/useTrackingLine";
const TrackingLine = (props) => {
  const { color, thickness } = props;
  const [trackingLine, resetTrackingLine] = useTrackingLine();
  return (
    <>
      {trackingLine.map((elem, index) => {
        return (
          <Polyline
            key={index}
            path={elem}
            options={{
              strokeColor: color,
              strokeOpacity: 0.8,
              strokeWeight: thickness,
            }}
          />
        );
      })}
    </>
  );
};

export default TrackingLine;
