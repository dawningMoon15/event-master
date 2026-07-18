import React, { createContext, useContext, useState, useEffect } from 'react';
import { recordBrowseHistory } from '../utils/recommendations';
import type { Event } from '../data/events';

// Re-export Event so consumers can import from here if they already do
export type { Event };

interface FavoritesContextType {
  favorites: Event[];
  addFavorite: (event: Event) => void;
  removeFavorite: (eventId: string) => void;
  isFavorite: (eventId: string) => boolean;
  /** Record that the user viewed this event (powers recommendations) */
  recordView: (event: Event) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Event[]>(() => {
    try {
      const saved = localStorage.getItem('favoriteEvents');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('favoriteEvents', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const addFavorite = (event: Event) => {
    setFavorites((prev) => (prev.some((e) => e.id === event.id) ? prev : [...prev, event]));
  };

  const removeFavorite = (eventId: string) => {
    setFavorites((prev) => prev.filter((event) => event.id !== eventId));
  };

  const isFavorite = (eventId: string) => favorites.some((event) => event.id === eventId);

  const recordView = (event: Event) => {
    recordBrowseHistory(event.type);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, recordView }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export default FavoritesContext;