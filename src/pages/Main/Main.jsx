import NewsBanner from "../../components/NewsBanner/NewsBanner";
import styles from "./styles.module.css";
import { getCategories, getNews } from "../../API/apiNews";
import NewsList from "../../components/NewsList/NewsList";
import Pagination from "../../components/Pagination/Pagination";
import Categories from "../../components/Categories/Categories";
import Search from "../../components/Search/Search";
import { useDebounce } from "../../helpers/hooks/useDebounce";
import { TOTAL_PAGES, PAGE_SIZE } from "../../constants/constants";
import { useFetch } from "../../helpers/hooks/useFetch";
import { useFilters } from "../../helpers/hooks/useFilters";

const Main = () => {
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

  const { data: dataCategories } = useFetch(getCategories);

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
    <main className={styles.main}>
      {dataCategories ? (
        <Categories
          categories={dataCategories.categories}
          selectedCategory={filters.category}
          setSelectedCategory={(category) => changeFilter("category", category)}
        />
      ) : null}
      <Search
        keywords={filters.keywords}
        setKeywords={(keywords) => changeFilter("keywords", keywords)}
      />
      <NewsBanner
        isLoading={isLoading}
        item={data && data.news && data.news[0]}
      />
      <Pagination
        currentPage={filters.page_number}
        nextPageHandle={nextPageHandle}
        previousPageHandle={previousPageHandle}
        pageClickHandle={pageClickHandle}
        totalPages={TOTAL_PAGES}
      />
      <NewsList isLoading={isLoading} news={data?.news} />
      <Pagination
        currentPage={filters.page_number}
        nextPageHandle={nextPageHandle}
        previousPageHandle={previousPageHandle}
        pageClickHandle={pageClickHandle}
        totalPages={TOTAL_PAGES}
      />
    </main>
  );
};

export default Main;
