import useSnsDefaultPageAtom from "../../../4_Shared/Recoil/useSnsDefaultPageAtom";
import useSnsRecentPageAtom from "../../../4_Shared/Recoil/useSnsRecentPageAtom";
import CATEGORY from "../constant/category";

const usePage = (category) =>{
  const [defaultPage, setSnsDefaultPage] = useSnsDefaultPageAtom();
  const [recentPage, setSnsRecentPage] = useSnsRecentPageAtom();

  let page, setPage;
  switch (category) {
    case CATEGORY.DEFAULT:
      page = defaultPage;
      setPage = setSnsDefaultPage;
      break;
    case CATEGORY.RECENT:
      page = recentPage;
      setPage = setSnsRecentPage;
      break;
    default:
      break;
  }

  return [page, setPage];
}

export default usePage;