import React, { createContext, useState, useContext, useEffect } from 'react';

const BookContext = createContext();

export function BookProvider({ children }) {
  const [shelf, setShelf] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("bookshelf");
    if (saved) {
      try {
        setShelf(JSON.parse(saved) || []);
      } catch {
        setShelf([]);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) localStorage.setItem("bookshelf", JSON.stringify(shelf));
  }, [shelf, isLoaded]);

  const value = {
    shelf,
    setShelf,
    addToShelf: (book) => !shelf.some(b => b.key === book.key) && setShelf(prev => [...prev, book]),
    removeFromShelf: (bookKey) => setShelf(prev => prev.filter(book => book.key !== bookKey)),
    isBookSaved: (bookKey) => shelf.some(book => book.key === bookKey),
    isLoaded
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your library...</p>
        </div>
      </div>
    );
  }

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) throw new Error('useBookContext must be used within BookProvider');
  return context;
};