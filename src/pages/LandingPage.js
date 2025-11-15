import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
const CONTENT_KEY = 'specter_admin_content_v1';
const defaultContent = {
    heroTitle: 'Елітна Академія Трейдингу',
    heroSubtitle: 'Емоції створюють хаос. Дисципліна створює результат.',
    heroBullets: [
        'Жодних сигналів — тільки системне мислення.',
        'Фокус на дисципліні, структурі та психології.',
        'Менторство від практикуючих трейдерів.'
    ],
    aboutLeft: 'Ми прийшли в трейдинг не заради престижу чи заголовків.\nМи прийшли через досвід — реальний, складний, формуючий.\nМи бачили, як бажання «заробити швидко» руйнує дисципліну.\nМи бачили, як емоції перетворюють ринок на хаос.\nТут і сформувалась наша філософія:\nЕмоції створюють хаос.\nДисципліна створює результат.',
    aboutRight: 'Наша академія створена для тих, хто втомився від шуму й порожніх обіцянок.\nДля тих, хто розуміє: ринок не винагороджує збудження — він винагороджує ясність.\nНе імпульсивна дія, а структура. Не надія, а точне виконання.\nМи розробили власний підхід до аналізу ринку.\nВін базується на логіці, послідовності та читанні поведінки ціни.\nМи не даємо сигнали. Ми формуємо мислення трейдера.\nМи — місце, де трейдер знаходить спокій, контроль та впевненість.\nДе дисципліна стає перевагою.\nА ясність — силою.',
    tradingCards: [
        { title: 'Трейдинг', text: 'Справжній трейдинг починається, коли ви адаптуєте фундамент під себе.' },
        { title: 'Емоційний контроль', text: 'Емоції — головний фактор, який віддаляє вас від успіху.' },
        { title: 'Дисципліна та ризик-менеджмент', text: 'Це фундамент, з якого починається розвиток трейдера.' },
        { title: 'Успіх', text: 'Успіх — це не вдача. Це важка праця, дисципліна й емоційний контроль.' }
    ],
    pricing: [
        {
            id: 'basic',
            title: 'BASIC EDUCATION',
            price: '289 USD',
            description: 'Базова освіта для тих, хто хоче структуру й фундамент.'
        },
        {
            id: 'premium',
            title: 'PREMIUM EDUCATION',
            price: '499 USD',
            description: 'Поглиблена програма з розборами та додатковими сесіями.'
        },
        {
            id: 'mentor',
            title: 'MENTORSHIP EDUCATION',
            price: 'Індивідуальна ціна',
            description: 'Індивідуальний супровід та гнучка програма.'
        }
    ]
};
const timeline = [
    { year: '2020', text: 'Засновано SPECTERTRADER та GRAMMTRADER' },
    { year: '2021', text: 'Новий офіс у Києві' },
    { year: '2022', text: 'Нова адаптивна стратегія з унікальними підходами' }
];
const mentors = [
    {
        name: 'SPECTERTRADER',
        bullets: ['Risk management', 'Market discipline', 'Unemotional trading', '27 успішних кейсів', '50+ виплат']
    },
    {
        name: 'GRAMMTRADER',
        bullets: ['Торгівля через психологію', 'Фреймворки структур', 'Поведінка ціни', '18 менторських запусків', '70% учнів із прогресом']
    }
];
const loadContent = () => {
    if (typeof window === 'undefined')
        return defaultContent;
    try {
        const stored = localStorage.getItem(CONTENT_KEY);
        if (!stored)
            return defaultContent;
        return { ...defaultContent, ...JSON.parse(stored) };
    }
    catch {
        return defaultContent;
    }
};
const LandingPage = () => {
    const [content, setContent] = useState(() => loadContent());
    useEffect(() => {
        const update = () => setContent(loadContent());
        window.addEventListener('storage', update);
        return () => window.removeEventListener('storage', update);
    }, []);
    return (_jsxs("div", { className: styles.page, children: [_jsx("section", { className: `${styles.hero} fade-in`, children: _jsxs("div", { children: [_jsx("p", { className: styles.label, children: "SPECTER INC. \u00B7 Elite Trading Academy" }), _jsx("h1", { children: content.heroTitle }), _jsx("p", { className: styles.subtitle, children: content.heroSubtitle }), _jsx("ul", { children: content.heroBullets.map((item) => (_jsx("li", { children: item }, item))) }), _jsxs("div", { className: styles.heroCtas, children: [_jsx(Link, { to: "/apply", className: styles.primaryBtn, children: "\u041F\u043E\u0434\u0430\u0442\u0438 \u0437\u0430\u044F\u0432\u043A\u0443" }), _jsx("a", { href: "#about", className: styles.secondaryBtn, children: "\u0414\u0456\u0437\u043D\u0430\u0442\u0438\u0441\u044F \u0431\u0456\u043B\u044C\u0448\u0435" })] })] }) }), _jsx("section", { id: "about", className: `${styles.about} fade-in`, children: _jsxs("div", { children: [_jsx("h2", { children: "\u041F\u0440\u043E \u043D\u0430\u0441" }), _jsxs("div", { className: styles.aboutGrid, children: [_jsx("p", { children: content.aboutLeft }), _jsx("p", { children: content.aboutRight })] })] }) }), _jsxs("section", { className: `${styles.cardsSection} fade-in`, children: [_jsxs("div", { className: styles.sectionHeader, children: [_jsx("p", { className: styles.label, children: "\u0429\u043E \u0442\u0430\u043A\u0435 \u0442\u0440\u0435\u0439\u0434\u0438\u043D\u0433" }), _jsx("h2", { children: "\u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430, \u0434\u0438\u0441\u0446\u0438\u043F\u043B\u0456\u043D\u0430 \u0442\u0430 \u0441\u043F\u043E\u043A\u0456\u0439" })] }), _jsx("div", { className: styles.cardGrid, children: content.tradingCards.map((card) => (_jsxs("article", { className: styles.card, children: [_jsx("h3", { children: card.title }), _jsx("p", { children: card.text })] }, card.title))) })] }), _jsxs("section", { className: `${styles.quote} fade-in`, children: [_jsx("p", { children: "\u201CTrading is the art of" }), _jsx("p", { children: "falling and rising" }), _jsx("p", { children: "until you learn to fly.\u201D" })] }), _jsxs("section", { className: `${styles.timeline} fade-in`, children: [_jsxs("div", { className: styles.sectionHeader, children: [_jsx("p", { className: styles.label, children: "\u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u0442\u0440\u0435\u0439\u0434\u0438\u043D\u0433\u0443" }), _jsx("h2", { children: "\u041B\u043E\u0433\u0456\u0447\u043D\u0438\u0439 \u0448\u043B\u044F\u0445 \u0440\u043E\u0437\u0432\u0438\u0442\u043A\u0443" })] }), _jsx("div", { className: styles.timelineGrid, children: timeline.map((item) => (_jsxs("article", { children: [_jsx("h3", { children: item.year }), _jsx("p", { children: item.text })] }, item.year))) }), _jsx("p", { className: styles.timelineNote, children: "\u0422\u043E\u0440\u0433\u043E\u0432\u0435\u043B\u044C\u043D\u0430 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u2014 \u0446\u0435 \u043B\u043E\u0433\u0456\u0447\u043D\u0438\u0439 \u043B\u0430\u043D\u0446\u044E\u0433, \u0437\u0430 \u044F\u043A\u0438\u043C \u0442\u0440\u0435\u0439\u0434\u0435\u0440 \u043F\u0440\u0438\u0439\u043C\u0430\u0454 \u0440\u0456\u0448\u0435\u043D\u043D\u044F. \u0412\u043E\u043D\u0430 \u0432\u0438\u0437\u043D\u0430\u0447\u0430\u0454 \u043F\u043E\u0441\u043B\u0456\u0434\u043E\u0432\u043D\u0456\u0441\u0442\u044C \u0434\u0456\u0439, \u0430 \u043D\u0435 \u043F\u0440\u043E\u0441\u0442\u043E \u043D\u0430\u0431\u0456\u0440 \u0437\u043D\u0430\u043D\u044C." })] }), _jsxs("section", { className: `${styles.mentors} fade-in`, children: [_jsxs("div", { className: styles.sectionHeader, children: [_jsx("p", { className: styles.label, children: "\u041C\u0435\u043D\u0442\u043E\u0440\u0438" }), _jsx("h2", { children: "\u041F\u0440\u0430\u043A\u0442\u0438\u043A\u0438, \u0449\u043E \u0444\u043E\u0440\u043C\u0443\u044E\u0442\u044C \u043C\u0438\u0441\u043B\u0435\u043D\u043D\u044F" })] }), _jsx("div", { className: styles.mentorGrid, children: mentors.map((mentor) => (_jsxs("article", { children: [_jsx("h3", { children: mentor.name }), _jsx("ul", { children: mentor.bullets.map((item) => (_jsx("li", { children: item }, item))) })] }, mentor.name))) })] }), _jsxs("section", { className: `${styles.pricing} fade-in`, children: [_jsxs("div", { className: styles.sectionHeader, children: [_jsx("p", { className: styles.label, children: "\u0422\u0430\u0440\u0438\u0444\u0438" }), _jsx("h2", { children: "\u0422\u043E\u0447\u043D\u0435 \u043D\u0430\u0432\u0447\u0430\u043D\u043D\u044F \u043F\u0456\u0434 \u0432\u0430\u0448 \u0440\u0456\u0432\u0435\u043D\u044C" })] }), _jsx("div", { className: styles.pricingGrid, children: content.pricing.map((plan) => (_jsxs("article", { children: [_jsx("p", { className: styles.label, children: plan.title }), _jsx("h3", { children: plan.price }), _jsx("p", { children: plan.description }), _jsx(Link, { to: "/apply", className: styles.primaryBtn, children: "\u041F\u043E\u0434\u0430\u0442\u0438 \u0437\u0430\u044F\u0432\u043A\u0443" })] }, plan.id))) })] })] }));
};
export default LandingPage;
