export type TelegramUser = {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
};

const tg = typeof window !== 'undefined' ? window.Telegram?.WebApp : undefined;

export const initTelegramWebApp = () => {
  if (!tg) return;
  try {
    tg.ready();
    tg.expand();
    if (tg.themeParams?.bg_color) {
      document.body.style.backgroundColor = `#${tg.themeParams.bg_color.replace('#', '')}`;
    }
  } catch (error) {
    console.warn('Telegram init error', error);
  }
};

export const getTelegramUser = (): TelegramUser | null => {
  if (!tg) return null;
  return tg.initDataUnsafe?.user ?? null;
};

export const telegram = tg;
