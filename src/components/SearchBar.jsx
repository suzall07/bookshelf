import React, { useState, useEffect } from "react";  // ADD THIS
import BookCard from "./BookCard";

export default function SearchBar({ shelf, setShelf }) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      searchBooks();
    } else {
      setBooks([]);
    }
  }, [debouncedQuery]);

  async function searchBooks() {
    setLoading(true);
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(debouncedQuery)}&limit=10`
      );
      const data = await res.json();
      setBooks(data.docs || []);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books by title, author, or subject..."
          className="
            w-full p-4 pl-12 rounded-xl border-2 border-gray-200 
            focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none
            shadow-sm text-lg
            transition-all duration-200
          "
          autoFocus
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
          🔍
        </div>
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Search Status */}
      <div className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-xl p-4">
        <div className="flex justify-between items-center">
          <div>
            {query ? (
              <p className="text-gray-700">
                Searching for: <span className="font-semibold text-blue-600">"{debouncedQuery}"</span>
              </p>
            ) : (
              <p className="text-gray-600">Type to start searching...</p>
            )}
          </div>
          {loading && (
            <div className="flex items-center gap-2 text-blue-600">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span>Searching...</span>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {books.length > 0 ? (
          <>
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                Results ({books.length})
              </h3>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                ↑ Back to top
              </button>
            </div>
            {books.map((book) => (
              <BookCard
                key={book.key}
                book={book}
                shelf={shelf}
                setShelf={setShelf}
              />
            ))}
          </>
        ) : (
          !loading && query && (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No books found</h3>
              <p className="text-gray-600">
                No results for "<span className="font-semibold">{debouncedQuery}</span>"
              </p>
              <p className="text-gray-500 text-sm mt-2">Try different keywords or check spelling</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}