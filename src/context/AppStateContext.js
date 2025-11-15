import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
const STORAGE_KEY = 'specter_app_state_v1';
const defaultState = {
    hasAccess: false,
    tariff: null,
    completedLessons: []
};
const AppStateContext = createContext(undefined);
const loadState = () => {
    if (typeof window === 'undefined')
        return defaultState;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw)
            return defaultState;
        return { ...defaultState, ...JSON.parse(raw) };
    }
    catch {
        return defaultState;
    }
};
export const AppStateProvider = ({ children }) => {
    const [state, setState] = useState(() => loadState());
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);
    const setAccess = useCallback((access, tariff) => {
        setState((prev) => ({ ...prev, hasAccess: access, tariff }));
    }, []);
    const toggleLessonCompleted = useCallback((lessonId) => {
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
    const value = useMemo(() => ({
        ...state,
        setAccess,
        toggleLessonCompleted
    }), [state, setAccess, toggleLessonCompleted]);
    return _jsx(AppStateContext.Provider, { value: value, children: children });
};
export const useAppState = () => {
    const ctx = useContext(AppStateContext);
    if (!ctx)
        throw new Error('useAppState must be used within AppStateProvider');
    return ctx;
};
