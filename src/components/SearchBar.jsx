import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import { useSearchBooks } from "../hooks/useBooks"; // Import the hook

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(timer);
  }, [query]);

  // Use TanStack Query instead of manual fetching
  const { 
    data: searchData, 
    isLoading: loading, 
    isError,
    error 
  } = useSearchBooks(debouncedQuery);

  const books = searchData?.docs || [];

  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books by title, author, or subject..."
          className="w-full p-4 pl-12 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none shadow-sm text-lg transition-all"
          autoFocus
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 text-xl">🔍</div>
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
            ✕
          </button>
        )}
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-700">
            {query ? (
              <>Searching for: <span className="font-semibold text-amber-700">"{debouncedQuery}"</span></>
            ) : (
              "Type to start searching..."
            )}
          </p>
          {loading && (
            <div className="flex items-center gap-2 text-amber-700">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-700"></div>
              <span>Searching...</span>
            </div>
          )}
          {isError && (
            <div className="text-red-600 text-sm">
              Error: {error?.message || "Failed to search"}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {books.length > 0 ? (
          <>
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Results ({books.length})</h3>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm text-gray-600 hover:text-gray-800">
                ↑ Back to top
              </button>
            </div>
            {books.map((book) => <BookCard key={book.key} book={book} />)}
          </>
        ) : (
          !loading && query && !isError && (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <div className="text-5xl mb-4">🔭</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No books found</h3>
              <p className="text-gray-600">No results for "<span className="font-semibold">{debouncedQuery}</span>"</p>
              <p className="text-gray-500 text-sm mt-2">Try different keywords or check spelling</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}