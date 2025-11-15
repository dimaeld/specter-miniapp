import { FormEvent, useEffect, useState } from 'react';
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
  } catch {
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

  const submitCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = codes.find((entry) => entry.code === code.trim() && entry.active);
    if (found) {
      setAccess(true, found.tariff as any);
      setMessage('Доступ відкрито. Ласкаво просимо в академію.');
    } else {
      setMessage('Невірний код. Перевірте, будь ласка, або зверніться до ментора.');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1>Профіль</h1>
        <p>
          Ваш Telegram: <strong>{telegramUser?.username ? `@${telegramUser.username}` : 'гість'}</strong>
        </p>
        <p>
          Доступ до курсу: <strong>{hasAccess ? 'Так' : 'Ні'}</strong>
        </p>
        <p>
          Тариф: <strong>{tariff ?? 'Не вибрано'}</strong>
        </p>
        <form className={styles.form} onSubmit={submitCode}>
          <label>
            Код доступу
            <input value={code} onChange={(e) => setCode(e.target.value)} required />
          </label>
          <button type="submit" className={styles.primaryBtn}>
            Підтвердити код
          </button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

export default ProfilePage;
