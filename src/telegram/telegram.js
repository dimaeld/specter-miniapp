const tg = typeof window !== 'undefined' ? window.Telegram?.WebApp : undefined;
export const initTelegramWebApp = () => {
    if (!tg)
        return;
    try {
        tg.ready();
        tg.expand();
        if (tg.themeParams?.bg_color) {
            document.body.style.backgroundColor = `#${tg.themeParams.bg_color.replace('#', '')}`;
        }
    }
    catch (error) {
        console.warn('Telegram init error', error);
    }
};
export const getTelegramUser = () => {
    if (!tg)
        return null;
    return tg.initDataUnsafe?.user ?? null;
};
export const telegram = tg;
