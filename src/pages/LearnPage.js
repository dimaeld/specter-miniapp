import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import styles from './LearnPage.module.css';
import { useAppState } from '../context/AppStateContext';
const modules = [
    {
        id: 'module1',
        title: 'Про академію',
        lessons: [
            { id: 'module1-lesson1', title: 'Вступ', description: 'Філософія SPECTER INC.', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { id: 'module1-lesson2', title: 'Мислення', description: 'Початкові принципи.', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { id: 'module1-lesson3', title: 'Практика', description: 'Як працює академія щодня.', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ]
    },
    {
        id: 'module2',
        title: 'Що таке трейдинг',
        lessons: [
            { id: 'module2-lesson1', title: 'Сенс', description: 'Що таке трейдинг для нас.', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { id: 'module2-lesson2', title: 'Фундамент', description: 'Основа підходу.', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { id: 'module2-lesson3', title: 'Середовище', description: 'Які ринки аналізуємо.', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ]
    },
    {
        id: 'module3',
        title: 'Структура трейдингу',
        lessons: [
            { id: 'module3-lesson1', title: 'Логіка', description: 'Ланцюг прийняття рішень.', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { id: 'module3-lesson2', title: 'Чек-листи', description: 'Послідовність дій.', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ]
    },
    {
        id: 'module4',
        title: 'Стратегія',
        lessons: [
            { id: 'module4-lesson1', title: 'Сценарії', description: 'Сценарії ринку.', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { id: 'module4-lesson2', title: 'Фільтри', description: 'Коли не торгувати.', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ]
    },
    {
        id: 'module5',
        title: 'Бектестінг',
        lessons: [
            { id: 'module5-lesson1', title: 'Дані', description: 'Що збираємо.', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { id: 'module5-lesson2', title: 'Аналіз', description: 'Як читаємо бектести.', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ]
    },
    {
        id: 'module6',
        title: 'Live Trading',
        lessons: [
            { id: 'module6-lesson1', title: 'Рутина', description: 'Щоденні процеси.', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { id: 'module6-lesson2', title: 'Аналіз', description: 'Післятрейдовий розбір.', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ]
    },
    {
        id: 'module7',
        title: 'Психологія трейдингу',
        lessons: [
            { id: 'module7-lesson1', title: 'Стан', description: 'Як зберігати спокій.', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { id: 'module7-lesson2', title: 'Фокус', description: 'Захист уваги.', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ]
    },
    {
        id: 'module8',
        title: 'Ментори',
        lessons: [
            { id: 'module8-lesson1', title: 'Методики', description: 'Підхід менторів.', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
        ]
    }
];
const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0);
const LearnPage = () => {
    const { completedLessons, toggleLessonCompleted } = useAppState();
    const [activeModule, setActiveModule] = useState(modules[0]);
    const [activeLesson, setActiveLesson] = useState(modules[0].lessons[0]);
    const [message, setMessage] = useState('');
    const progress = useMemo(() => Math.round((completedLessons.length / totalLessons) * 100), [completedLessons.length]);
    useEffect(() => {
        setActiveLesson(activeModule.lessons[0]);
    }, [activeModule]);
    const markCompleted = () => {
        toggleLessonCompleted(activeLesson.id);
        setMessage('Урок позначено як пройдений');
        setTimeout(() => setMessage(''), 2000);
    };
    return (_jsxs("div", { className: styles.page, children: [_jsxs("div", { className: styles.banner, children: [_jsx("h1", { children: "\u041D\u0430\u0432\u0447\u0430\u043D\u043D\u044F" }), _jsxs("p", { children: ["\u041F\u0440\u043E\u0433\u0440\u0435\u0441: ", progress, "%"] })] }), _jsxs("div", { className: styles.layout, children: [_jsx("aside", { className: styles.modules, children: modules.map((module) => {
                            const completed = module.lessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
                            const ratio = Math.round((completed / module.lessons.length) * 100);
                            return (_jsxs("button", { className: `${styles.moduleBtn} ${module.id === activeModule.id ? styles.moduleActive : ''}`, onClick: () => setActiveModule(module), children: [_jsx("span", { children: module.title }), _jsxs("span", { children: [ratio, "%"] })] }, module.id));
                        }) }), _jsxs("section", { className: styles.lessons, children: [_jsx("div", { className: styles.lessonList, children: activeModule.lessons.map((lesson) => (_jsxs("button", { className: `${styles.lessonBtn} ${lesson.id === activeLesson.id ? styles.lessonActive : ''}`, onClick: () => setActiveLesson(lesson), children: [_jsx("span", { children: lesson.title }), _jsx("span", { children: completedLessons.includes(lesson.id) ? 'Пройдено' : 'Очікує' })] }, lesson.id))) }), activeLesson && (_jsxs("div", { className: styles.lessonView, children: [_jsx("h2", { children: activeLesson.title }), _jsx("p", { children: activeLesson.description }), _jsx("div", { className: styles.videoWrapper, children: _jsx("iframe", { src: activeLesson.video, title: activeLesson.title, allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true }) }), _jsx("button", { className: styles.primaryBtn, onClick: markCompleted, children: "\u041F\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u0438 \u044F\u043A \u043F\u0440\u043E\u0439\u0434\u0435\u043D\u0438\u0439" }), message && _jsx("p", { className: styles.toast, children: message })] }))] })] })] }));
};
export default LearnPage;
