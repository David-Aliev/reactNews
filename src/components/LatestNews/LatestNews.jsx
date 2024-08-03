import BannersList from "../BannersList/BannersList";
import styles from "./styles.module.css";
import { useFetch } from "../../helpers/hooks/useFetch";
import { getLatestNews } from "../../API/apiNews";

const LatestNews = () => {
  const { data, isLoading } = useFetch(getLatestNews);
  return (
    <section className={styles.section}>
      <BannersList banners={data && data.news} isLoading={isLoading} />
    </section>
  );
};

export default LatestNews;
