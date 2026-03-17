import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Footer from "./Footer";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo></Logo>
      <AppNav></AppNav>

      {/* displaying nested content of nested routes */}
      <Outlet></Outlet>

      <Footer />
    </div>
  );
}

export default Sidebar;
