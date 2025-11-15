import { FormEvent, useMemo, useState } from 'react';
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
    if (!stored) return [];
    return JSON.parse(stored);
  } catch {
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
    markets: [] as string[],
    tariff: 'BASIC',
    expectations: ''
  });

  const marketsLabel = useMemo(() => form.markets.join(', '), [form.markets]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <h2>Заявку надіслано</h2>
          <p>
            Ментор звʼяжеться з вами в Telegram, надасть реквізити для оплати та код доступу до платформи.
          </p>
          <Link to="/" className={styles.primaryBtn}>
            Повернутися на головну
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1>Заявка на вступ</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Імʼя та прізвище
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </label>
          <label>
            Telegram username
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </label>
          <label>
            Email
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label>
            Досвід
            <select value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })}>
              <option>Новачок</option>
              <option>1–2 роки</option>
              <option>3+ років</option>
            </select>
          </label>
          <fieldset className={styles.fieldset}>
            <legend>Ринки</legend>
            {marketOptions.map((option) => (
              <label key={option} className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={form.markets.includes(option)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setForm({ ...form, markets: [...form.markets, option] });
                    } else {
                      setForm({ ...form, markets: form.markets.filter((item) => item !== option) });
                    }
                  }}
                />
                {option}
              </label>
            ))}
          </fieldset>
          <label>
            Обраний тариф
            <select value={form.tariff} onChange={(e) => setForm({ ...form, tariff: e.target.value })}>
              {tariffOptions.map((tariff) => (
                <option key={tariff.value} value={tariff.value}>
                  {tariff.label}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.fullRow}>
            Що ви очікуєте від навчання?
            <textarea
              rows={4}
              value={form.expectations}
              onChange={(e) => setForm({ ...form, expectations: e.target.value })}
            />
          </label>
          <p className={styles.summary}>Вибрані ринки: {marketsLabel || 'не вибрано'}</p>
          <button type="submit" className={styles.primaryBtn}>
            Надіслати заявку
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyPage;
