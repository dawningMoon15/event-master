import React, { createContext, useContext, useState, useEffect } from 'react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  type: string;
  price: number;
  availableTickets: number;
}

interface FavoritesContextType {
  favorites: Event[];
  addFavorite: (event: Event) => void;
  removeFavorite: (eventId: string) => void;
  isFavorite: (eventId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Event[]>(() => {
    const saved = localStorage.getItem('favoriteEvents');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoriteEvents', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (event: Event) => {
    setFavorites(prev => [...prev, event]);
  };

  const removeFavorite = (eventId: string) => {
    setFavorites(prev => prev.filter(event => event.id !== eventId));
  };

  const isFavorite = (eventId: string) => {
    return favorites.some(event => event.id === eventId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
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