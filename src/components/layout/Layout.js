import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';
const Layout = ({ children }) => {
    const location = useLocation();
    const showCta = location.pathname === '/';
    return (_jsxs("div", { className: styles.shell, children: [_jsxs("header", { className: styles.header, children: [_jsx(Link, { to: "/", className: styles.logo, children: "SPECTER INC." }), _jsxs("nav", { className: styles.nav, children: [_jsx(Link, { to: "/", className: styles.navLink, children: "\u0413\u043E\u043B\u043E\u0432\u043D\u0430" }), _jsx(Link, { to: "/learn", className: styles.navLink, children: "\u041D\u0430\u0432\u0447\u0430\u043D\u043D\u044F" }), _jsx(Link, { to: "/profile", className: styles.navLink, children: "\u041F\u0440\u043E\u0444\u0456\u043B\u044C" })] }), _jsx(Link, { to: "/apply", className: styles.ghostBtn, children: "\u041F\u043E\u0434\u0430\u0442\u0438 \u0437\u0430\u044F\u0432\u043A\u0443" })] }), _jsxs("main", { children: [children ?? _jsx(Outlet, {}), showCta && (_jsx(Link, { to: "/apply", className: styles.floatingCta, children: "\u041F\u043E\u0434\u0430\u0442\u0438 \u0437\u0430\u044F\u0432\u043A\u0443" }))] }), _jsxs("footer", { className: styles.footer, children: ["\u00A9 ", new Date().getFullYear(), " SPECTER INC. \u2014 Elite Trading Academy"] })] }));
};
export default Layout;
