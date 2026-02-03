import React from "react";
import { useNavigate } from "react-router-dom";
import { useBookContext } from "../pages/BookContext";

export default function ShelfPage() {
  const navigate = useNavigate();
  const { shelf, removeFromShelf } = useBookContext();

  const getBookId = (bookKey) => bookKey?.includes("/") ? bookKey.split("/").pop() : bookKey || "";
  const removeBook = (key, e) => { e.stopPropagation(); removeFromShelf(key); };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-amber-900 mb-2">📚 My Bookshelf</h1>
        <p className="text-amber-800">
          {shelf.length === 0 ? "Your shelf is waiting for adventures! Start adding books." : `You have ${shelf.length} book${shelf.length !== 1 ? 's' : ''} in your collection.`}
        </p>
      </div>

      {shelf.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
          <div className="text-6xl mb-4">🔭</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">Empty Shelf</h3>
          <p className="text-gray-600 mb-6">No books saved yet. Search for books to add them to your shelf!</p>
          <a href="/search" className="inline-block px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-all shadow-md">
            🔍 Start Searching
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {shelf.map((book) => (
            <div 
              key={book.key} 
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-amber-100 hover:border-amber-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => navigate(`/book/${getBookId(book.key)}`)}
            >
              <div className="relative h-48 overflow-hidden">
                {book.coverUrl ? (
                  <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                    <span className="text-amber-600 text-lg">📖</span>
                  </div>
                )}
                <button 
                  onClick={(e) => removeBook(book.key, e)}
                  className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-600 transition-colors shadow-md flex items-center gap-1"
                >
                  ✕ Remove
                </button>
              </div>

              <div className="p-4">
                <h4 className="font-bold text-gray-800 mb-1 line-clamp-1" title={book.title}>{book.title}</h4>
                <p className="text-gray-600 text-sm mb-2 line-clamp-1">{book.author_name?.[0] || "Unknown Author"}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded">{book.first_publish_year || "Year N/A"}</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigate(`/book/${getBookId(book.key)}`); }}
                    className="text-amber-700 text-sm font-medium hover:text-amber-900"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}