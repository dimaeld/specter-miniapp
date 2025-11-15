import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import styles from './AdminPage.module.css';
const PASSWORD = 'ADMIN2024';
const APPLICATIONS_KEY = 'specter_applications_v1';
const CONTENT_KEY = 'specter_admin_content_v1';
const ACCESS_CODES_KEY = 'specter_access_codes_v1';
const tradingCardDefaults = [
    { title: 'Трейдинг', text: 'Справжній трейдинг починається, коли ви адаптуєте фундамент під себе.' },
    { title: 'Емоційний контроль', text: 'Емоції — головний фактор, який віддаляє вас від успіху.' },
    { title: 'Дисципліна та ризик-менеджмент', text: 'Це фундамент, з якого починається розвиток трейдера.' },
    { title: 'Успіх', text: 'Успіх — це не вдача. Це важка праця, дисципліна й емоційний контроль.' }
];
const pricingDefaults = [
    { id: 'basic', title: 'BASIC EDUCATION', price: '289 USD', description: 'Базова освіта для тих, хто хоче структуру й фундамент.' },
    { id: 'premium', title: 'PREMIUM EDUCATION', price: '499 USD', description: 'Поглиблена програма з розборами та додатковими сесіями.' },
    { id: 'mentor', title: 'MENTORSHIP EDUCATION', price: 'Індивідуальна ціна', description: 'Індивідуальний супровід та гнучка програма.' }
];
const defaultCodes = [
    { code: 'BASIC2024', tariff: 'BASIC', active: true },
    { code: 'PREMIUM2024', tariff: 'PREMIUM', active: true },
    { code: 'MENTOR2024', tariff: 'MENTOR', active: true }
];
const defaultContent = {
    heroTitle: 'Елітна Академія Трейдингу',
    heroSubtitle: 'Емоції створюють хаос. Дисципліна створює результат.',
    aboutLeft: '',
    aboutRight: '',
    tradingCards: tradingCardDefaults,
    pricing: pricingDefaults
};
const AdminPage = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [authed, setAuthed] = useState(false);
    const [tab, setTab] = useState('applications');
    const [applications, setApplications] = useState(() => loadFromStorage(APPLICATIONS_KEY, []));
    const [content, setContent] = useState(() => mergeContent(loadFromStorage(CONTENT_KEY, {})));
    const [codes, setCodes] = useState(() => loadCodes());
    useEffect(() => {
        const handler = () => {
            setApplications(loadFromStorage(APPLICATIONS_KEY, []));
            setContent(mergeContent(loadFromStorage(CONTENT_KEY, {})));
            setCodes(loadCodes());
        };
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    }, []);
    const attemptLogin = (event) => {
        event.preventDefault();
        if (password === PASSWORD) {
            setAuthed(true);
            setError('');
        }
        else {
            setError('Невірний код');
        }
    };
    const updateApplicationStatus = (index, status) => {
        const next = applications.map((app, idx) => (idx === index ? { ...app, status } : app));
        setApplications(next);
        localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(next));
    };
    const saveContent = () => {
        localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
    };
    const addCode = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newCode = {
            code: String(formData.get('code')),
            tariff: String(formData.get('tariff')),
            active: true
        };
        const next = [newCode, ...codes];
        setCodes(next);
        localStorage.setItem(ACCESS_CODES_KEY, JSON.stringify(next));
        event.currentTarget.reset();
    };
    const toggleCode = (codeValue) => {
        const next = codes.map((entry) => (entry.code === codeValue ? { ...entry, active: !entry.active } : entry));
        setCodes(next);
        localStorage.setItem(ACCESS_CODES_KEY, JSON.stringify(next));
    };
    if (!authed) {
        return (_jsx("div", { className: styles.page, children: _jsxs("form", { className: styles.login, onSubmit: attemptLogin, children: [_jsx("h1", { children: "\u0412\u0445\u0456\u0434 \u0434\u043E \u0430\u0434\u043C\u0456\u043D\u043A\u0438" }), _jsx("input", { value: password, onChange: (e) => setPassword(e.target.value), placeholder: "ADMIN2024" }), _jsx("button", { type: "submit", children: "\u0423\u0432\u0456\u0439\u0442\u0438" }), error && _jsx("p", { className: styles.error, children: error })] }) }));
    }
    return (_jsxs("div", { className: styles.page, children: [_jsxs("div", { className: styles.tabs, children: [_jsx("button", { className: tab === 'applications' ? styles.activeTab : '', onClick: () => setTab('applications'), children: "\u0417\u0430\u044F\u0432\u043A\u0438" }), _jsx("button", { className: tab === 'content' ? styles.activeTab : '', onClick: () => setTab('content'), children: "\u041A\u043E\u043D\u0442\u0435\u043D\u0442" }), _jsx("button", { className: tab === 'codes' ? styles.activeTab : '', onClick: () => setTab('codes'), children: "\u041A\u043E\u0434\u0438 \u0434\u043E\u0441\u0442\u0443\u043F\u0443" })] }), tab === 'applications' && (_jsxs("section", { className: styles.panel, children: [_jsx("h2", { children: "\u0417\u0430\u044F\u0432\u043A\u0438" }), _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u0406\u043C\u02BC\u044F" }), _jsx("th", { children: "Username" }), _jsx("th", { children: "\u0414\u043E\u0441\u0432\u0456\u0434" }), _jsx("th", { children: "\u0420\u0438\u043D\u043A\u0438" }), _jsx("th", { children: "\u0422\u0430\u0440\u0438\u0444" }), _jsx("th", { children: "\u0421\u0442\u0430\u0442\u0443\u0441" })] }) }), _jsx("tbody", { children: applications.map((app, index) => (_jsxs("tr", { children: [_jsx("td", { children: app.name }), _jsx("td", { children: app.username }), _jsx("td", { children: app.experience }), _jsx("td", { children: Array.isArray(app.markets) ? app.markets.join(', ') : app.markets }), _jsx("td", { children: app.tariff }), _jsx("td", { children: _jsxs("select", { value: app.status, onChange: (e) => updateApplicationStatus(index, e.target.value), children: [_jsx("option", { value: "new", children: "\u041D\u043E\u0432\u0438\u0439" }), _jsx("option", { value: "paid", children: "\u041E\u043F\u043B\u0430\u0447\u0435\u043D\u043E" }), _jsx("option", { value: "granted", children: "\u0414\u043E\u0441\u0442\u0443\u043F \u043D\u0430\u0434\u0430\u043D\u043E" })] }) })] }, index))) })] })] })), tab === 'content' && (_jsxs("section", { className: styles.panel, children: [_jsx("h2", { children: "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043D\u043D\u044F \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0443" }), _jsxs("label", { children: ["\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0433\u0435\u0440\u043E\u044F", _jsx("input", { value: content.heroTitle, onChange: (e) => setContent({ ...content, heroTitle: e.target.value }) })] }), _jsxs("label", { children: ["\u041F\u0456\u0434\u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0433\u0435\u0440\u043E\u044F", _jsx("input", { value: content.heroSubtitle, onChange: (e) => setContent({ ...content, heroSubtitle: e.target.value }) })] }), _jsxs("label", { children: ["\u0422\u0435\u043A\u0441\u0442 \u043B\u0456\u0432\u043E\u0440\u0443\u0447 (About)", _jsx("textarea", { rows: 4, value: content.aboutLeft, onChange: (e) => setContent({ ...content, aboutLeft: e.target.value }) })] }), _jsxs("label", { children: ["\u0422\u0435\u043A\u0441\u0442 \u043F\u0440\u0430\u0432\u043E\u0440\u0443\u0447 (About)", _jsx("textarea", { rows: 4, value: content.aboutRight, onChange: (e) => setContent({ ...content, aboutRight: e.target.value }) })] }), _jsxs("div", { className: styles.listGroup, children: [_jsx("h3", { children: "\u0411\u043B\u043E\u043A \u00AB\u0429\u043E \u0442\u0430\u043A\u0435 \u0442\u0440\u0435\u0439\u0434\u0438\u043D\u0433\u00BB" }), content.tradingCards.map((card, index) => (_jsxs("label", { children: [card.title, _jsx("textarea", { rows: 3, value: card.text, onChange: (e) => {
                                            const next = [...content.tradingCards];
                                            next[index] = { ...next[index], text: e.target.value };
                                            setContent({ ...content, tradingCards: next });
                                        } })] }, card.title)))] }), _jsxs("div", { className: styles.listGroup, children: [_jsx("h3", { children: "\u0422\u0430\u0440\u0438\u0444\u0438" }), content.pricing.map((plan, index) => (_jsxs("div", { className: styles.pricingRow, children: [_jsxs("label", { children: ["\u041D\u0430\u0437\u0432\u0430", _jsx("input", { value: plan.title, onChange: (e) => {
                                                    const next = [...content.pricing];
                                                    next[index] = { ...next[index], title: e.target.value };
                                                    setContent({ ...content, pricing: next });
                                                } })] }), _jsxs("label", { children: ["\u0426\u0456\u043D\u0430", _jsx("input", { value: plan.price, onChange: (e) => {
                                                    const next = [...content.pricing];
                                                    next[index] = { ...next[index], price: e.target.value };
                                                    setContent({ ...content, pricing: next });
                                                } })] }), _jsxs("label", { children: ["\u041E\u043F\u0438\u0441", _jsx("textarea", { rows: 2, value: plan.description, onChange: (e) => {
                                                    const next = [...content.pricing];
                                                    next[index] = { ...next[index], description: e.target.value };
                                                    setContent({ ...content, pricing: next });
                                                } })] })] }, plan.id)))] }), _jsx("button", { onClick: saveContent, children: "\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438" })] })), tab === 'codes' && (_jsxs("section", { className: styles.panel, children: [_jsx("h2", { children: "\u041A\u043E\u0434\u0438 \u0434\u043E\u0441\u0442\u0443\u043F\u0443" }), _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u041A\u043E\u0434" }), _jsx("th", { children: "\u0422\u0430\u0440\u0438\u0444" }), _jsx("th", { children: "\u0421\u0442\u0430\u0442\u0443\u0441" }), _jsx("th", {})] }) }), _jsx("tbody", { children: codes.map((entry) => (_jsxs("tr", { children: [_jsx("td", { children: entry.code }), _jsx("td", { children: entry.tariff }), _jsx("td", { children: entry.active ? 'Активний' : 'Вимкнений' }), _jsx("td", { children: _jsx("button", { onClick: () => toggleCode(entry.code), children: entry.active ? 'Деактивувати' : 'Активувати' }) })] }, entry.code))) })] }), _jsxs("form", { className: styles.codeForm, onSubmit: addCode, children: [_jsx("input", { name: "code", placeholder: "\u041D\u043E\u0432\u0438\u0439 \u043A\u043E\u0434", required: true }), _jsxs("select", { name: "tariff", children: [_jsx("option", { value: "BASIC", children: "BASIC" }), _jsx("option", { value: "PREMIUM", children: "PREMIUM" }), _jsx("option", { value: "MENTOR", children: "MENTOR" })] }), _jsx("button", { type: "submit", children: "\u0414\u043E\u0434\u0430\u0442\u0438" })] })] }))] }));
};
function loadFromStorage(key, fallback) {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : fallback;
    }
    catch {
        return fallback;
    }
}
function mergeContent(raw) {
    return {
        ...defaultContent,
        ...raw,
        tradingCards: raw.tradingCards ?? tradingCardDefaults,
        pricing: raw.pricing ?? pricingDefaults
    };
}
function loadCodes() {
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
}
export default AdminPage;
