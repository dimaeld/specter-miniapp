import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import ApplyPage from './pages/ApplyPage';
import LearnPage from './pages/LearnPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import { useAppState } from './context/AppStateContext';
import { useEffect } from 'react';
const App = () => {
    const { hasAccess } = useAppState();
    const location = useLocation();
    useEffect(() => {
        const elements = document.querySelectorAll('.fade-in');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, { threshold: 0.2 });
        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [location.pathname]);
    return (_jsx(Routes, { children: _jsxs(Route, { element: _jsx(Layout, {}), children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/apply", element: _jsx(ApplyPage, {}) }), _jsx(Route, { path: "/profile", element: _jsx(ProfilePage, {}) }), _jsx(Route, { path: "/learn", element: hasAccess ? _jsx(LearnPage, {}) : _jsx(Navigate, { to: "/profile", replace: true }) }), _jsx(Route, { path: "/admin", element: _jsx(AdminPage, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }) }));
};
export default App;
