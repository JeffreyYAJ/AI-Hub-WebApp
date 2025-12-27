import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppContextType, AISite, BarPosition, Theme, AppState } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultSites: AISite[] = [
  { id: '1', name: 'ChatGPT', url: 'https://chat.openai.com', icon: '🤖', order: 0 },
  { id: '2', name: 'Claude', url: 'https://claude.ai', icon: '🧠', order: 1 },
  { id: '3', name: 'Perplexity', url: 'https://perplexity.ai', icon: '🔍', order: 2 },
  { id: '4', name: 'Gemini', url: 'https://gemini.google.com', icon: '✨', order: 3 },
];

const STORAGE_KEY = 'ai-hub-state';

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return {
          pinnedSites: defaultSites,
          barPosition: 'left' as BarPosition,
          theme: 'dark' as Theme,
          currentSiteId: null,
        };
      }
    }
    return {
      pinnedSites: defaultSites,
      barPosition: 'left' as BarPosition,
      theme: 'dark' as Theme,
      currentSiteId: null,
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  const addSite = (site: Omit<AISite, 'id' | 'order'>) => {
    const newSite: AISite = {
      ...site,
      id: Date.now().toString(),
      order: state.pinnedSites.length,
    };
    setState(prev => ({
      ...prev,
      pinnedSites: [...prev.pinnedSites, newSite],
    }));
  };

  const removeSite = (id: string) => {
    setState(prev => ({
      ...prev,
      pinnedSites: prev.pinnedSites.filter(site => site.id !== id),
      currentSiteId: prev.currentSiteId === id ? null : prev.currentSiteId,
    }));
  };

  const updateSiteOrder = (sites: AISite[]) => {
    setState(prev => ({
      ...prev,
      pinnedSites: sites,
    }));
  };

  const setBarPosition = (position: BarPosition) => {
    setState(prev => ({
      ...prev,
      barPosition: position,
    }));
  };

  const setTheme = (theme: Theme) => {
    setState(prev => ({
      ...prev,
      theme,
    }));
  };

  const setCurrentSite = (id: string | null) => {
    setState(prev => ({
      ...prev,
      currentSiteId: id,
    }));
  };

  const value: AppContextType = {
    ...state,
    addSite,
    removeSite,
    updateSiteOrder,
    setBarPosition,
    setTheme,
    setCurrentSite,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
