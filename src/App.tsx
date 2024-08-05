import Header from "./components/Header/Header";
import { useTheme } from "./context/ThemeContext.tsx";
import Main from "./pages/Main/Main.tsx";

function App() {
  const { isDark } = useTheme();
  return (
    <div className={`app ${isDark ? "dark" : "light"}`}>
      <Header />
      <div className="container">
        <Main />
      </div>
    </div>
  );
}

export default App;
