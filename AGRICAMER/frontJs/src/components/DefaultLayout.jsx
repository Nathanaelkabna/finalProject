import styles from "./css/defaultLayout.module.css";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { Outlet } from "react-router-dom";
import Nav from "./userComponent/Nav.jsx";
import Footer from "./userComponent/Footer.jsx";
export default function DefaultLayout() {
  const { theme } = useStateContext();
  return (
    <div className={theme === "light" ? styles.lightTheme : styles.darkTheme}>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}
