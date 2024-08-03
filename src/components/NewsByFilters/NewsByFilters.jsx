import styles from "./styles.module.css";
import NewsList from "../NewsList/NewsList";
import { TOTAL_PAGES, PAGE_SIZE } from "../../constants/constants";
import { useFilters } from "../../helpers/hooks/useFilters";
import { useFetch } from "../../helpers/hooks/useFetch";
import { useDebounce } from "../../helpers/hooks/useDebounce";
import { getNews } from "../../API/apiNews";
import NewsFilters from "../NewsFilters/NewsFilters";
import PaginationWrapper from "../PaginationWrapper/PaginationWrapper";

const NewsByFilters = () => {
  const { filters, changeFilter } = useFilters({
    page_number: 1,
    page_size: PAGE_SIZE,
    category: null,
    keywords: "",
  });

  const debounceKeywords = useDebounce(filters.keywords, 1500);

  const { data, isLoading } = useFetch(getNews, {
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

  const pageClickHandle = (pageNumber) => {
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
