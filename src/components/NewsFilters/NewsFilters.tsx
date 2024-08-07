import styles from "./styles.module.css";
import Categories from "../Categories/Categories";
import Search from "../Search/Search.tsx";
import Slider from "../Slider/Slider.tsx";
import { IFilters } from "../../interfaces";
import { useTheme } from "../../context/ThemeContext.tsx";
import { useGetCategoriesQuery } from "../../store/services/newsApi.ts";
import { useAppDispatch } from "../../store/index.ts";
import { setFilters } from "../../store/slices/newsSlice.ts";

interface Props {
  filters: IFilters;
}

const NewsFilters = ({ filters }: Props) => {
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();
  const { data } = useGetCategoriesQuery(null);

  return (
    <div className={styles.filters}>
      {data ? (
        <Slider isDark={isDark}>
          <Categories
            categories={data.categories}
            selectedCategory={filters.category}
            setSelectedCategory={(category) =>
              dispatch(setFilters({ key: "category", value: category }))
            }
          />
        </Slider>
      ) : null}

      <Search
        keywords={filters.keywords}
        setKeywords={(keywords) =>
          dispatch(setFilters({ key: "keywords", value: keywords }))
        }
      />
    </div>
  );
};

export default NewsFilters;
