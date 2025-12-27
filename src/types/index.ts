export interface AISite {
  id: string;
  name: string;
  url: string;
  icon?: string;
  order: number;
}

export type BarPosition = 'left' | 'right' | 'bottom';

export type Theme = 'dark' | 'light';

export interface AppState {
  pinnedSites: AISite[];
  barPosition: BarPosition;
  theme: Theme;
  currentSiteId: string | null;
}

export interface AppContextType extends AppState {
  addSite: (site: Omit<AISite, 'id' | 'order'>) => void;
  removeSite: (id: string) => void;
  updateSiteOrder: (sites: AISite[]) => void;
  setBarPosition: (position: BarPosition) => void;
  setTheme: (theme: Theme) => void;
  setCurrentSite: (id: string | null) => void;
}
