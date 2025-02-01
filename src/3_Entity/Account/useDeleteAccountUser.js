import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const useDeleteAccountUser = () => {
  const [serverState, request] = useFetch();

  const deleteAccountUser = async () => {
    const endpoint = `/account/delete`;
    await request("DELETE", endpoint, null);
  };

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      default:
        console.log("삭제 성공");
        break;
    }
  }, [serverState]);

  return [deleteAccountUser];
};

export default useDeleteAccountUser;
