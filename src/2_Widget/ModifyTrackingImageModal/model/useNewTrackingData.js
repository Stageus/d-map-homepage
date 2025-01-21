import React from "react";
import useTrackingLineAtom from "../../../4_Shared/Recoil/useTrackingLineAtom";

const useNewTrackingData = (trackingData) => {
  const [newTrackingData, setNewTrackingData] = React.useState(trackingData);
  const [defaultTrackingLine,] = useTrackingLineAtom();
  const modifyNewTrackingData = (newData) => {
    setNewTrackingData({ ...newTrackingData, ...newData });
  };

  React.useEffect(()=>{
    if(!trackingData.line){
      setNewTrackingData({...newTrackingData, line: defaultTrackingLine});
      console.log(defaultTrackingLine)
    }
  },[])

  return [newTrackingData, modifyNewTrackingData];
};

export default useNewTrackingData;
