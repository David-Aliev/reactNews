import styles from "./styles.module.css";
import NewsList from "../NewsList/NewsList.tsx";
import { TOTAL_PAGES } from "../../constants/constants.ts";
import { useDebounce } from "../../helpers/hooks/useDebounce.ts";
import NewsFilters from "../NewsFilters/NewsFilters.tsx";
import PaginationWrapper from "../PaginationWrapper/PaginationWrapper.tsx";
import { useGetNewsQuery } from "../../store/services/newsApi.ts";
import { useAppDispatch, useAppSelector } from "../../store/index.ts";
import { setFilters } from "../../store/slices/newsSlice.ts";

const NewsByFilters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.news.filters);
  const news = useAppSelector((state) => state.news.news);

  const debounceKeywords = useDebounce(filters.keywords, 1500);

  const { isLoading } = useGetNewsQuery({
    ...filters,
    keywords: debounceKeywords,
  });

  const nextPageHandle = () => {
    if (filters.page_number < TOTAL_PAGES) {
      dispatch(
        setFilters({ key: "page_number", value: filters.page_number + 1 })
      );
    }
  };

  const previousPageHandle = () => {
    if (filters.page_number > 1) {
      dispatch(
        setFilters({ key: "page_number", value: filters.page_number - 1 })
      );
    }
  };

  const pageClickHandle = (pageNumber: number) => {
    // changeFilter("page_number", pageNumber);
    dispatch(setFilters({ key: "page_number", value: pageNumber }));
  };

  return (
    <section className={styles.section}>
      <NewsFilters filters={filters} />

      <PaginationWrapper
        top={true}
        bottom={true}
        currentPage={filters.page_number}
        nextPageHandle={nextPageHandle}
        previousPageHandle={previousPageHandle}
        pageClickHandle={pageClickHandle}
        totalPages={TOTAL_PAGES}
      >
        <NewsList isLoading={isLoading} news={news} />
      </PaginationWrapper>
    </section>
  );
};

export default NewsByFilters;
