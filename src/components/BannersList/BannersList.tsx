import styles from "./styles.module.css";
import withSkeleton from "../../helpers/hocs/withSkeleton.tsx";
import NewsBanner from "../NewsBanner/NewsBanner.tsx";
import { INews } from "../../interfaces";
import { SkeletonProps } from "../../helpers/hocs/withSkeleton.tsx";
interface Props {
  banners?: INews[] | null;
}

const BannersList = ({ banners }: Props) => {
  return (
    <ul className={styles.banners}>
      {banners?.map((banner) => {
        return <NewsBanner key={banner.id} item={banner} />;
      })}
    </ul>
  );
};

const BannersListWithSkeleton = withSkeleton<Props & SkeletonProps>(
  BannersList,
  "banner",
  10,
  "row"
);

export default BannersListWithSkeleton;
