import React from "react";

const useTrackingList = (category = "default", page = 1) => {
  const [loading, setLoading] = React.useState(false);
  const [trackingList, setTrackingList] = React.useState();

  const fetchTrackingList = async () => {
    setLoading(true);
    try {

    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchTrackingList();
  }, [page]);

  return [trackingList, loading];
};

export default useTrackingList;
