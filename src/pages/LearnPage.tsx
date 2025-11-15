import { useEffect, useMemo, useState } from 'react';
import styles from './LearnPage.module.css';
import { useAppState } from '../context/AppStateContext';

interface Lesson {
  id: string;
  title: string;
  description: string;
  video: string;
}

interface ModuleData {
  id: string;
  title: string;
  lessons: Lesson[];
}

const modules: ModuleData[] = [
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

  return (
    <div className={styles.page}>
      <div className={styles.banner}>
        <h1>Навчання</h1>
        <p>Прогрес: {progress}%</p>
      </div>
      <div className={styles.layout}>
        <aside className={styles.modules}>
          {modules.map((module) => {
            const completed = module.lessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
            const ratio = Math.round((completed / module.lessons.length) * 100);
            return (
              <button
                key={module.id}
                className={`${styles.moduleBtn} ${module.id === activeModule.id ? styles.moduleActive : ''}`}
                onClick={() => setActiveModule(module)}
              >
                <span>{module.title}</span>
                <span>{ratio}%</span>
              </button>
            );
          })}
        </aside>
        <section className={styles.lessons}>
          <div className={styles.lessonList}>
            {activeModule.lessons.map((lesson) => (
              <button
                key={lesson.id}
                className={`${styles.lessonBtn} ${lesson.id === activeLesson.id ? styles.lessonActive : ''}`}
                onClick={() => setActiveLesson(lesson)}
              >
                <span>{lesson.title}</span>
                <span>{completedLessons.includes(lesson.id) ? 'Пройдено' : 'Очікує'}</span>
              </button>
            ))}
          </div>
          {activeLesson && (
            <div className={styles.lessonView}>
              <h2>{activeLesson.title}</h2>
              <p>{activeLesson.description}</p>
              <div className={styles.videoWrapper}>
                <iframe src={activeLesson.video} title={activeLesson.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
              <button className={styles.primaryBtn} onClick={markCompleted}>
                Позначити як пройдений
              </button>
              {message && <p className={styles.toast}>{message}</p>}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default LearnPage;
