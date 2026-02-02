import React, { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Lazy load with error boundaries
const HomePage = lazy(() => import("./pages/HomePage").catch(() => ({ 
  default: () => <div>Failed to load HomePage</div> 
})));
const SearchPage = lazy(() => import("./pages/SearchPage").catch(() => ({ 
  default: () => <div>Failed to load SearchPage</div> 
})));
const ShelfPage = lazy(() => import("./pages/ShelfPage").catch(() => ({ 
  default: () => <div>Failed to load ShelfPage</div> 
})));
const BookDetailsPage = lazy(() => import("./pages/BookDetailsPage").catch(() => ({ 
  default: () => <div>Failed to load Book Details</div> 
})));

export default function App() {
  const [shelf, setShelf] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("bookshelf");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setShelf(parsed || []);
      } catch {
        setShelf([]);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("bookshelf", JSON.stringify(shelf));
    }
  }, [shelf, isLoaded]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your library...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
        <header className="max-w-6xl mx-auto mb-8">
          <h1 className="text-4xl font-bold text-center text-bold">
            📚 The Infinite Bookshelf
          </h1>
          
          <nav className="flex justify-center gap-6 mb-6">
            <Link to="/" className="px-4 py-2 rounded-lg bg-white shadow-sm hover:shadow-md border border-gray-200">
              🏠 Home
            </Link>
            <Link to="/search" className="px-4 py-2 rounded-lg bg-white shadow-sm hover:shadow-md border border-gray-200">
              🔍 Search
            </Link>
            <Link to="/shelf" className="px-4 py-2 rounded-lg bg-white shadow-sm hover:shadow-md border border-gray-200">
              📖 My Shelf ({shelf.length})
            </Link>
          </nav>
        </header>

        <main className="max-w-6xl mx-auto">
          <Suspense fallback={<div className="text-center py-12">Loading page...</div>}>
            <Routes>
              <Route path="/" element={<HomePage shelf={shelf} setShelf={setShelf} />} />
              <Route path="/search" element={<SearchPage shelf={shelf} setShelf={setShelf} />} />
              <Route path="/shelf" element={<ShelfPage shelf={shelf} setShelf={setShelf} />} />
              <Route path="/book/:bookKey" element={<BookDetailsPage shelf={shelf} setShelf={setShelf} />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}