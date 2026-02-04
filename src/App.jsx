import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useBookContext } from "./context/BookContext";

const HomePage = lazy(() => import("./pages/HomePage").catch(() => ({ default: () => <div>Failed to load HomePage</div> })));
const SearchPage = lazy(() => import("./pages/SearchPage").catch(() => ({ default: () => <div>Failed to load SearchPage</div> })));
const ShelfPage = lazy(() => import("./pages/ShelfPage").catch(() => ({ default: () => <div>Failed to load ShelfPage</div> })));
const BookDetailsPage = lazy(() => import("./pages/BookDetailsPage").catch(() => ({ default: () => <div>Failed to load Book Details</div> })));

export default function App() {
  const { shelf, isLoaded } = useBookContext();

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

  return (
    <Router>
      <div className="min-h-screen bg-amber-50 p-6">
        <header className="max-w-6xl mx-auto mb-8">
          <h1 className="text-4xl font-bold text-center text-amber-900 mb-6">📚 The Infinite Bookshelf</h1>
          
          <nav className="flex justify-center gap-6">
            {[
              { to: "/", label: "🏠 Home" },
              { to: "/search", label: "🔍 Search" },
              { to: "/shelf", label: `📖 My Shelf (${shelf.length})` }
            ].map(({ to, label }) => (
              <Link key={to} to={to} className="px-4 py-2 rounded-lg bg-white shadow-sm hover:shadow-md border border-amber-200 hover:border-amber-400 transition">
                {label}
              </Link>
            ))}
          </nav>
        </header>

        <main className="max-w-6xl mx-auto">
          <Suspense fallback={<div className="text-center py-12">Loading page...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/shelf" element={<ShelfPage />} />
              <Route path="/book/:bookKey" element={<BookDetailsPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}