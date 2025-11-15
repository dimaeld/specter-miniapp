import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ApplyPage.module.css';
import { getTelegramUser } from '../telegram/telegram';
const APPLICATIONS_KEY = 'specter_applications_v1';
const marketOptions = ['Криптовалюти', "Ф'ючерси", 'FX', 'Індекси'];
const tariffOptions = [
    { value: 'BASIC', label: 'BASIC EDUCATION' },
    { value: 'PREMIUM', label: 'PREMIUM EDUCATION' },
    { value: 'MENTOR', label: 'MENTORSHIP EDUCATION' }
];
const loadApplications = () => {
    try {
        const stored = localStorage.getItem(APPLICATIONS_KEY);
        if (!stored)
            return [];
        return JSON.parse(stored);
    }
    catch {
        return [];
    }
};
const ApplyPage = () => {
    const telegramUser = getTelegramUser();
    const [success, setSuccess] = useState(false);
    const [applications, setApplications] = useState(() => loadApplications());
    const [form, setForm] = useState({
        name: '',
        username: telegramUser?.username ? `@${telegramUser.username}` : '',
        email: '',
        experience: 'Новачок',
        markets: [],
        tariff: 'BASIC',
        expectations: ''
    });
    const marketsLabel = useMemo(() => form.markets.join(', '), [form.markets]);
    const handleSubmit = (event) => {
        event.preventDefault();
        const payload = {
            ...form,
            markets: form.markets,
            status: 'new',
            createdAt: new Date().toISOString()
        };
        const next = [payload, ...applications];
        setApplications(next);
        localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(next));
        setSuccess(true);
    };
    if (success) {
        return (_jsx("div", { className: styles.page, children: _jsxs("div", { className: styles.card, children: [_jsx("h2", { children: "\u0417\u0430\u044F\u0432\u043A\u0443 \u043D\u0430\u0434\u0456\u0441\u043B\u0430\u043D\u043E" }), _jsx("p", { children: "\u041C\u0435\u043D\u0442\u043E\u0440 \u0437\u0432\u02BC\u044F\u0436\u0435\u0442\u044C\u0441\u044F \u0437 \u0432\u0430\u043C\u0438 \u0432 Telegram, \u043D\u0430\u0434\u0430\u0441\u0442\u044C \u0440\u0435\u043A\u0432\u0456\u0437\u0438\u0442\u0438 \u0434\u043B\u044F \u043E\u043F\u043B\u0430\u0442\u0438 \u0442\u0430 \u043A\u043E\u0434 \u0434\u043E\u0441\u0442\u0443\u043F\u0443 \u0434\u043E \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0438." }), _jsx(Link, { to: "/", className: styles.primaryBtn, children: "\u041F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u0438\u0441\u044F \u043D\u0430 \u0433\u043E\u043B\u043E\u0432\u043D\u0443" })] }) }));
    }
    return (_jsx("div", { className: styles.page, children: _jsxs("div", { className: styles.card, children: [_jsx("h1", { children: "\u0417\u0430\u044F\u0432\u043A\u0430 \u043D\u0430 \u0432\u0441\u0442\u0443\u043F" }), _jsxs("form", { className: styles.form, onSubmit: handleSubmit, children: [_jsxs("label", { children: ["\u0406\u043C\u02BC\u044F \u0442\u0430 \u043F\u0440\u0456\u0437\u0432\u0438\u0449\u0435", _jsx("input", { type: "text", value: form.name, onChange: (e) => setForm({ ...form, name: e.target.value }), required: true })] }), _jsxs("label", { children: ["Telegram username", _jsx("input", { type: "text", value: form.username, onChange: (e) => setForm({ ...form, username: e.target.value }), required: true })] }), _jsxs("label", { children: ["Email", _jsx("input", { type: "email", value: form.email, onChange: (e) => setForm({ ...form, email: e.target.value }) })] }), _jsxs("label", { children: ["\u0414\u043E\u0441\u0432\u0456\u0434", _jsxs("select", { value: form.experience, onChange: (e) => setForm({ ...form, experience: e.target.value }), children: [_jsx("option", { children: "\u041D\u043E\u0432\u0430\u0447\u043E\u043A" }), _jsx("option", { children: "1\u20132 \u0440\u043E\u043A\u0438" }), _jsx("option", { children: "3+ \u0440\u043E\u043A\u0456\u0432" })] })] }), _jsxs("fieldset", { className: styles.fieldset, children: [_jsx("legend", { children: "\u0420\u0438\u043D\u043A\u0438" }), marketOptions.map((option) => (_jsxs("label", { className: styles.checkboxRow, children: [_jsx("input", { type: "checkbox", checked: form.markets.includes(option), onChange: (e) => {
                                                if (e.target.checked) {
                                                    setForm({ ...form, markets: [...form.markets, option] });
                                                }
                                                else {
                                                    setForm({ ...form, markets: form.markets.filter((item) => item !== option) });
                                                }
                                            } }), option] }, option)))] }), _jsxs("label", { children: ["\u041E\u0431\u0440\u0430\u043D\u0438\u0439 \u0442\u0430\u0440\u0438\u0444", _jsx("select", { value: form.tariff, onChange: (e) => setForm({ ...form, tariff: e.target.value }), children: tariffOptions.map((tariff) => (_jsx("option", { value: tariff.value, children: tariff.label }, tariff.value))) })] }), _jsxs("label", { className: styles.fullRow, children: ["\u0429\u043E \u0432\u0438 \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u0435 \u0432\u0456\u0434 \u043D\u0430\u0432\u0447\u0430\u043D\u043D\u044F?", _jsx("textarea", { rows: 4, value: form.expectations, onChange: (e) => setForm({ ...form, expectations: e.target.value }) })] }), _jsxs("p", { className: styles.summary, children: ["\u0412\u0438\u0431\u0440\u0430\u043D\u0456 \u0440\u0438\u043D\u043A\u0438: ", marketsLabel || 'не вибрано'] }), _jsx("button", { type: "submit", className: styles.primaryBtn, children: "\u041D\u0430\u0434\u0456\u0441\u043B\u0430\u0442\u0438 \u0437\u0430\u044F\u0432\u043A\u0443" })] })] }) }));
};
export default ApplyPage;
