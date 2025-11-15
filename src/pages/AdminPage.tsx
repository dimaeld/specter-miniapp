import { FormEvent, useEffect, useState } from 'react';
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
  const [tab, setTab] = useState<'applications' | 'content' | 'codes'>('applications');
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

  const attemptLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === PASSWORD) {
      setAuthed(true);
      setError('');
    } else {
      setError('Невірний код');
    }
  };

  const updateApplicationStatus = (index: number, status: string) => {
    const next = applications.map((app: any, idx: number) => (idx === index ? { ...app, status } : app));
    setApplications(next);
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(next));
  };

  const saveContent = () => {
    localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
  };

  const addCode = (event: FormEvent<HTMLFormElement>) => {
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

  const toggleCode = (code: string) => {
    const next = codes.map((entry) => (entry.code === code ? { ...entry, active: !entry.active } : entry));
    setCodes(next);
    localStorage.setItem(ACCESS_CODES_KEY, JSON.stringify(next));
  };

  if (!authed) {
    return (
      <div className={styles.page}>
        <form className={styles.login} onSubmit={attemptLogin}>
          <h1>Вхід до адмінки</h1>
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="ADMIN2024" />
          <button type="submit">Увійти</button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.tabs}>
        <button className={tab === 'applications' ? styles.activeTab : ''} onClick={() => setTab('applications')}>
          Заявки
        </button>
        <button className={tab === 'content' ? styles.activeTab : ''} onClick={() => setTab('content')}>
          Контент
        </button>
        <button className={tab === 'codes' ? styles.activeTab : ''} onClick={() => setTab('codes')}>
          Коди доступу
        </button>
      </div>

      {tab === 'applications' && (
        <section className={styles.panel}>
          <h2>Заявки</h2>
          <table>
            <thead>
              <tr>
                <th>Імʼя</th>
                <th>Username</th>
                <th>Досвід</th>
                <th>Ринки</th>
                <th>Тариф</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app: any, index: number) => (
                <tr key={index}>
                  <td>{app.name}</td>
                  <td>{app.username}</td>
                  <td>{app.experience}</td>
                  <td>{Array.isArray(app.markets) ? app.markets.join(', ') : app.markets}</td>
                  <td>{app.tariff}</td>
                  <td>
                    <select value={app.status} onChange={(e) => updateApplicationStatus(index, e.target.value)}>
                      <option value="new">Новий</option>
                      <option value="paid">Оплачено</option>
                      <option value="granted">Доступ надано</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {tab === 'content' && (
        <section className={styles.panel}>
          <h2>Редагування контенту</h2>
          <label>
            Заголовок героя
            <input value={content.heroTitle} onChange={(e) => setContent({ ...content, heroTitle: e.target.value })} />
          </label>
          <label>
            Підзаголовок героя
            <input value={content.heroSubtitle} onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })} />
          </label>
          <label>
            Текст ліворуч (About)
            <textarea
              rows={4}
              value={content.aboutLeft}
              onChange={(e) => setContent({ ...content, aboutLeft: e.target.value })}
            />
          </label>
          <label>
            Текст праворуч (About)
            <textarea
              rows={4}
              value={content.aboutRight}
              onChange={(e) => setContent({ ...content, aboutRight: e.target.value })}
            />
          </label>
          <div className={styles.listGroup}>
            <h3>Блок «Що таке трейдинг»</h3>
            {content.tradingCards.map((card: any, index: number) => (
              <label key={card.title}>
                {card.title}
                <textarea
                  rows={3}
                  value={card.text}
                  onChange={(e) => {
                    const next = [...content.tradingCards];
                    next[index] = { ...next[index], text: e.target.value };
                    setContent({ ...content, tradingCards: next });
                  }}
                />
              </label>
            ))}
          </div>
          <div className={styles.listGroup}>
            <h3>Тарифи</h3>
            {content.pricing.map((plan: any, index: number) => (
              <div key={plan.id} className={styles.pricingRow}>
                <label>
                  Назва
                  <input
                    value={plan.title}
                    onChange={(e) => {
                      const next = [...content.pricing];
                      next[index] = { ...next[index], title: e.target.value };
                      setContent({ ...content, pricing: next });
                    }}
                  />
                </label>
                <label>
                  Ціна
                  <input
                    value={plan.price}
                    onChange={(e) => {
                      const next = [...content.pricing];
                      next[index] = { ...next[index], price: e.target.value };
                      setContent({ ...content, pricing: next });
                    }}
                  />
                </label>
                <label>
                  Опис
                  <textarea
                    rows={2}
                    value={plan.description}
                    onChange={(e) => {
                      const next = [...content.pricing];
                      next[index] = { ...next[index], description: e.target.value };
                      setContent({ ...content, pricing: next });
                    }}
                  />
                </label>
              </div>
            ))}
          </div>
          <button onClick={saveContent}>Зберегти</button>
        </section>
      )}

      {tab === 'codes' && (
        <section className={styles.panel}>
          <h2>Коди доступу</h2>
          <table>
            <thead>
              <tr>
                <th>Код</th>
                <th>Тариф</th>
                <th>Статус</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {codes.map((entry: any) => (
                <tr key={entry.code}>
                  <td>{entry.code}</td>
                  <td>{entry.tariff}</td>
                  <td>{entry.active ? 'Активний' : 'Вимкнений'}</td>
                  <td>
                    <button onClick={() => toggleCode(entry.code)}>{entry.active ? 'Деактивувати' : 'Активувати'}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <form className={styles.codeForm} onSubmit={addCode}>
            <input name="code" placeholder="Новий код" required />
            <select name="tariff">
              <option value="BASIC">BASIC</option>
              <option value="PREMIUM">PREMIUM</option>
              <option value="MENTOR">MENTOR</option>
            </select>
            <button type="submit">Додати</button>
          </form>
        </section>
      )}
    </div>
  );
};

function loadFromStorage(key: string, fallback: any) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function mergeContent(raw: any) {
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
  } catch {
    return defaultCodes;
  }
}

export default AdminPage;
