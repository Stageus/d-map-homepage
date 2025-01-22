import React from "react";

const useDetailModal = () => {
  const [viewDetailModal, setViewDetailModal] = React.useState(false);
  const toggleDetailModal = () => {
    setViewDetailModal(!viewDetailModal);
  }

  return [viewDetailModal, toggleDetailModal];
}

export default useDetailModal;