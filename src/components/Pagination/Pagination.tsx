import { IPaginationProps } from "../../interfaces";
import styles from "./styles.module.css";

const Pagination = ({
  totalPages,
  pageClickHandle,
  currentPage,
  nextPageHandle,
  previousPageHandle,
}: IPaginationProps) => {
  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage <= 1}
        onClick={previousPageHandle}
        className={styles.arrow}
      >
        {"<"}
      </button>
      <div className={styles.list}>
        {[...Array(totalPages)].map((_, index) => {
          return (
            <button
              disabled={index + 1 === currentPage}
              onClick={() => pageClickHandle(index + 1)}
              className={styles.pageNumber}
              key={index}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <button
        disabled={currentPage >= totalPages}
        onClick={nextPageHandle}
        className={styles.arrow}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
