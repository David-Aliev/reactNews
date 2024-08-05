import { themeIcons } from "../../assest/index.ts";
import { formatDate } from "../../helpers/formatDate.ts";
import styles from "./styles.module.css";
import { useTheme } from "../../context/ThemeContext.tsx";

const Header = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header
      className={`${styles.header} ${isDark ? styles.dark : styles.light}`}
    >
      <div className={styles.info}>
        <h1 className={styles.title}>news</h1>
        <p className={styles.date}>{formatDate(new Date())}</p>
      </div>

      <img
        src={isDark ? themeIcons.white : themeIcons.dark}
        width={30}
        height={30}
        alt="theme"
        onClick={toggleTheme}
      />
    </header>
  );
};

export default Header;
