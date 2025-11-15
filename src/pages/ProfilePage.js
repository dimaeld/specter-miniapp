import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import styles from './ProfilePage.module.css';
import { useAppState } from '../context/AppStateContext';
import { getTelegramUser } from '../telegram/telegram';
const ACCESS_CODES_KEY = 'specter_access_codes_v1';
const defaultCodes = [
    { code: 'BASIC2024', tariff: 'BASIC', active: true },
    { code: 'PREMIUM2024', tariff: 'PREMIUM', active: true },
    { code: 'MENTOR2024', tariff: 'MENTOR', active: true }
];
const loadCodes = () => {
    try {
        const stored = localStorage.getItem(ACCESS_CODES_KEY);
        if (!stored) {
            localStorage.setItem(ACCESS_CODES_KEY, JSON.stringify(defaultCodes));
            return defaultCodes;
        }
        return JSON.parse(stored);
    }
    catch {
        return defaultCodes;
    }
};
const ProfilePage = () => {
    const { hasAccess, tariff, setAccess } = useAppState();
    const telegramUser = getTelegramUser();
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [codes, setCodes] = useState(() => loadCodes());
    useEffect(() => {
        const handleStorage = () => setCodes(loadCodes());
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);
    const submitCode = (event) => {
        event.preventDefault();
        const found = codes.find((entry) => entry.code === code.trim() && entry.active);
        if (found) {
            setAccess(true, found.tariff);
            setMessage('Доступ відкрито. Ласкаво просимо в академію.');
        }
        else {
            setMessage('Невірний код. Перевірте, будь ласка, або зверніться до ментора.');
        }
    };
    return (_jsx("div", { className: styles.page, children: _jsxs("div", { className: styles.card, children: [_jsx("h1", { children: "\u041F\u0440\u043E\u0444\u0456\u043B\u044C" }), _jsxs("p", { children: ["\u0412\u0430\u0448 Telegram: ", _jsx("strong", { children: telegramUser?.username ? `@${telegramUser.username}` : 'гість' })] }), _jsxs("p", { children: ["\u0414\u043E\u0441\u0442\u0443\u043F \u0434\u043E \u043A\u0443\u0440\u0441\u0443: ", _jsx("strong", { children: hasAccess ? 'Так' : 'Ні' })] }), _jsxs("p", { children: ["\u0422\u0430\u0440\u0438\u0444: ", _jsx("strong", { children: tariff ?? 'Не вибрано' })] }), _jsxs("form", { className: styles.form, onSubmit: submitCode, children: [_jsxs("label", { children: ["\u041A\u043E\u0434 \u0434\u043E\u0441\u0442\u0443\u043F\u0443", _jsx("input", { value: code, onChange: (e) => setCode(e.target.value), required: true })] }), _jsx("button", { type: "submit", className: styles.primaryBtn, children: "\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0438 \u043A\u043E\u0434" })] }), message && _jsx("p", { className: styles.message, children: message })] }) }));
};
export default ProfilePage;
