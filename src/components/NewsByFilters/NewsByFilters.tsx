import styles from "./styles.module.css";
import NewsList from "../NewsList/NewsList.tsx";
import { TOTAL_PAGES, PAGE_SIZE } from "../../constants/constants.ts";
import { useFilters } from "../../helpers/hooks/useFilters.ts";
import { useFetch } from "../../helpers/hooks/useFetch.ts";
import { useDebounce } from "../../helpers/hooks/useDebounce.ts";
import { getNews } from "../../API/apiNews";
import NewsFilters from "../NewsFilters/NewsFilters.tsx";
import PaginationWrapper from "../PaginationWrapper/PaginationWrapper.tsx";
import { NewsApiResponse, ParamsType } from "../../interfaces/index.ts";

const NewsByFilters = () => {
  const { filters, changeFilter } = useFilters({
    page_number: 1,
    page_size: PAGE_SIZE,
    category: null,
    keywords: "",
  });

  const debounceKeywords = useDebounce(filters.keywords, 1500);

  const { data, isLoading } = useFetch<NewsApiResponse, ParamsType>(getNews, {
    ...filters,
    keywords: debounceKeywords,
  });

  const nextPageHandle = () => {
    if (filters.page_number < TOTAL_PAGES) {
      changeFilter("page_number", filters.page_number + 1);
    }
  };

  const previousPageHandle = () => {
    if (filters.page_number > 1) {
      changeFilter("page_number", filters.page_number - 1);
    }
  };

  const pageClickHandle = (pageNumber: number) => {
    changeFilter("page_number", pageNumber);
  };

  return (
    <section className={styles.section}>
      <NewsFilters filters={filters} changeFilter={changeFilter} />

      <PaginationWrapper
        top={true}
        bottom={true}
        currentPage={filters.page_number}
        nextPageHandle={nextPageHandle}
        previousPageHandle={previousPageHandle}
        pageClickHandle={pageClickHandle}
        totalPages={TOTAL_PAGES}
      >
        <NewsList isLoading={isLoading} news={data?.news} />
      </PaginationWrapper>
    </section>
  );
};

export default NewsByFilters;
