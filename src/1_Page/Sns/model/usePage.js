import useSnsDefaultPageAtom from "../../../4_Shared/Recoil/useSnsDefaultPageAtom";
import useSnsRecentPageAtom from "../../../4_Shared/Recoil/useSnsTodayHotPageAtom";
import CATEGORY from "../constant/category";

const usePage = (category) =>{
  const [todayHotPage, setTodayHotPagePage] = useSnsDefaultPageAtom();
  const [defaultPage, setDefaultPage] = useSnsRecentPageAtom();

  let page, setPage;
  switch (category) {
    case CATEGORY.TODAYHOT:
      page = todayHotPage;
      setPage = setTodayHotPagePage;
      break;
    case CATEGORY.DEFAULT:
      page = defaultPage;
      setPage = setDefaultPage;
      break;
    default:
      break;
  }

  return [page, setPage];
}

export default usePage;