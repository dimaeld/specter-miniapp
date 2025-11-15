import { ReactNode } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = ({ children }: { children?: ReactNode }) => {
  const location = useLocation();
  const showCta = location.pathname === '/';

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          SPECTER INC.
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Головна
          </Link>
          <Link to="/learn" className={styles.navLink}>
            Навчання
          </Link>
          <Link to="/profile" className={styles.navLink}>
            Профіль
          </Link>
        </nav>
        <Link to="/apply" className={styles.ghostBtn}>
          Подати заявку
        </Link>
      </header>
      <main>
        {children ?? <Outlet />}
        {showCta && (
          <Link to="/apply" className={styles.floatingCta}>
            Подати заявку
          </Link>
        )}
      </main>
      <footer className={styles.footer}>
        © {new Date().getFullYear()} SPECTER INC. — Elite Trading Academy
      </footer>
    </div>
  );
};

export default Layout;
