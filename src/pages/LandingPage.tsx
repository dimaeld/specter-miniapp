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
  aboutLeft:
    'Ми прийшли в трейдинг не заради престижу чи заголовків.\nМи прийшли через досвід — реальний, складний, формуючий.\nМи бачили, як бажання «заробити швидко» руйнує дисципліну.\nМи бачили, як емоції перетворюють ринок на хаос.\nТут і сформувалась наша філософія:\nЕмоції створюють хаос.\nДисципліна створює результат.',
  aboutRight:
    'Наша академія створена для тих, хто втомився від шуму й порожніх обіцянок.\nДля тих, хто розуміє: ринок не винагороджує збудження — він винагороджує ясність.\nНе імпульсивна дія, а структура. Не надія, а точне виконання.\nМи розробили власний підхід до аналізу ринку.\nВін базується на логіці, послідовності та читанні поведінки ціни.\nМи не даємо сигнали. Ми формуємо мислення трейдера.\nМи — місце, де трейдер знаходить спокій, контроль та впевненість.\nДе дисципліна стає перевагою.\nА ясність — силою.',
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
  if (typeof window === 'undefined') return defaultContent;
  try {
    const stored = localStorage.getItem(CONTENT_KEY);
    if (!stored) return defaultContent;
    return { ...defaultContent, ...JSON.parse(stored) };
  } catch {
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

  return (
    <div className={styles.page}>
      <section className={`${styles.hero} fade-in`}>
        <div>
          <p className={styles.label}>SPECTER INC. · Elite Trading Academy</p>
          <h1>{content.heroTitle}</h1>
          <p className={styles.subtitle}>{content.heroSubtitle}</p>
          <ul>
            {content.heroBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className={styles.heroCtas}>
            <Link to="/apply" className={styles.primaryBtn}>
              Подати заявку
            </Link>
            <a href="#about" className={styles.secondaryBtn}>
              Дізнатися більше
            </a>
          </div>
        </div>
      </section>

      <section id="about" className={`${styles.about} fade-in`}>
        <div>
          <h2>Про нас</h2>
          <div className={styles.aboutGrid}>
            <p>{content.aboutLeft}</p>
            <p>{content.aboutRight}</p>
          </div>
        </div>
      </section>

      <section className={`${styles.cardsSection} fade-in`}>
        <div className={styles.sectionHeader}>
          <p className={styles.label}>Що таке трейдинг</p>
          <h2>Структура, дисципліна та спокій</h2>
        </div>
        <div className={styles.cardGrid}>
          {content.tradingCards.map((card) => (
            <article key={card.title} className={styles.card}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.quote} fade-in`}>
        <p>“Trading is the art of</p>
        <p>falling and rising</p>
        <p>until you learn to fly.”</p>
      </section>

      <section className={`${styles.timeline} fade-in`}>
        <div className={styles.sectionHeader}>
          <p className={styles.label}>Структура трейдингу</p>
          <h2>Логічний шлях розвитку</h2>
        </div>
        <div className={styles.timelineGrid}>
          {timeline.map((item) => (
            <article key={item.year}>
              <h3>{item.year}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <p className={styles.timelineNote}>
          Торговельна структура — це логічний ланцюг, за яким трейдер приймає рішення. Вона визначає послідовність дій, а не просто набір знань.
        </p>
      </section>

      <section className={`${styles.mentors} fade-in`}>
        <div className={styles.sectionHeader}>
          <p className={styles.label}>Ментори</p>
          <h2>Практики, що формують мислення</h2>
        </div>
        <div className={styles.mentorGrid}>
          {mentors.map((mentor) => (
            <article key={mentor.name}>
              <h3>{mentor.name}</h3>
              <ul>
                {mentor.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.pricing} fade-in`}>
        <div className={styles.sectionHeader}>
          <p className={styles.label}>Тарифи</p>
          <h2>Точне навчання під ваш рівень</h2>
        </div>
        <div className={styles.pricingGrid}>
          {content.pricing.map((plan) => (
            <article key={plan.id}>
              <p className={styles.label}>{plan.title}</p>
              <h3>{plan.price}</h3>
              <p>{plan.description}</p>
              <Link to="/apply" className={styles.primaryBtn}>
                Подати заявку
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
