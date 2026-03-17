import { Link, NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
// Link and NavLink works similar, allowing to not reload page after routing between them, but
// BUT NavLinks are making current page active, giving it corresponding class "active" which we can style with css

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo></Logo>
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
