import { createContext, useCallback, useContext, useMemo, useState, useEffect, ReactNode } from 'react';

export type TariffType = 'BASIC' | 'PREMIUM' | 'MENTOR' | null;

export interface AppState {
  hasAccess: boolean;
  tariff: TariffType;
  completedLessons: string[];
}

type AppStateContextValue = AppState & {
  setAccess: (access: boolean, tariff: TariffType) => void;
  toggleLessonCompleted: (lessonId: string) => void;
};

const STORAGE_KEY = 'specter_app_state_v1';

const defaultState: AppState = {
  hasAccess: false,
  tariff: null,
  completedLessons: []
};

const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

const loadState = (): AppState => {
  if (typeof window === 'undefined') return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
};

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(() => loadState());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setAccess = useCallback((access: boolean, tariff: TariffType) => {
    setState((prev) => ({ ...prev, hasAccess: access, tariff }));
  }, []);

  const toggleLessonCompleted = useCallback((lessonId: string) => {
    setState((prev) => {
      const exists = prev.completedLessons.includes(lessonId);
      return {
        ...prev,
        completedLessons: exists
          ? prev.completedLessons.filter((id) => id !== lessonId)
          : [...prev.completedLessons, lessonId]
      };
    });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      setAccess,
      toggleLessonCompleted
    }),
    [state, setAccess, toggleLessonCompleted]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
};
