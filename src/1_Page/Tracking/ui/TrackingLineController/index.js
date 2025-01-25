import { Polyline } from "@react-google-maps/api";
import useTrackingLine from "./model/useTrackingLine";
import STYLE from "./style";
import reset_icon from "./assets/reset.svg"
import undo_icon from "./assets/undo.svg"
import redo_icon from "./assets/redo.svg"
const TrackingLineController = (props) => {
  const { color, thickness } = props;
  const [trackingLine, resetTrackingLine, undoTrackingLine, redoTrackingLine] = useTrackingLine();
  return (
    <STYLE.TrackingLineController>
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

      <STYLE.TrackingLineControlBtnContainer>
        <STYLE.TrackingLineControlBtn>
          <STYLE.TrackingLineControlBtnIconImage src={reset_icon} alt="reset btn" onClick={resetTrackingLine}/>
        </STYLE.TrackingLineControlBtn>

        <STYLE.TrackingLineControlBtn>
          <STYLE.TrackingLineControlBtnIconImage src={undo_icon} alt="undo btn" onClick={undoTrackingLine}/>
        </STYLE.TrackingLineControlBtn>
        <STYLE.TrackingLineControlBtn>
          <STYLE.TrackingLineControlBtnIconImage src={redo_icon} alt="redo btn"onClick={redoTrackingLine}/>
        </STYLE.TrackingLineControlBtn>
      </STYLE.TrackingLineControlBtnContainer>
    </STYLE.TrackingLineController>
  );
};

export default TrackingLineController;
