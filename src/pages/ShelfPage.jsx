import React from "react";
import { useNavigate } from "react-router-dom";

export default function ShelfPage({ shelf, setShelf }) {
  const navigate = useNavigate();

  const getBookId = (bookKey) => {
    if (!bookKey) return "";
    if (bookKey.includes("/")) {
      return bookKey.split("/").pop();
    }
    return bookKey;
  };

  function removeBook(key, e) {
    e.stopPropagation();
    setShelf(shelf.filter(book => book.key !== key));
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📚 My Bookshelf</h1>
        <p className="text-gray-600">
          {shelf.length === 0 
            ? "Your shelf is waiting for adventures! Start adding books."
            : `You have ${shelf.length} book${shelf.length !== 1 ? 's' : ''} in your collection.`
          }
        </p>
      </div>

      {/* Books Grid */}
      {shelf.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">Empty Shelf</h3>
          <p className="text-gray-600 mb-6">No books saved yet. Search for books to add them to your shelf!</p>
          <a 
            href="/search" 
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md"
          >
            🔍 Start Searching
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {shelf.map((book) => (
            <div 
              key={book.key} 
              className="
                bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg 
                transition-all duration-300 border border-gray-100 hover:border-purple-200
                transform hover:-translate-y-1 cursor-pointer
              "
              onClick={() => navigate(`/book/${getBookId(book.key)}`)}
            >
              {/* Book Cover */}
              <div className="relative h-48 overflow-hidden">
                {book.coverUrl ? (
                  <img 
                    src={book.coverUrl} 
                    alt={book.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">📖</span>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <button 
                    onClick={(e) => removeBook(book.key, e)}
                    className="
                      bg-red-500 text-white text-xs px-2 py-1 rounded-full 
                      hover:bg-red-600 transition-colors duration-200 shadow-md
                      flex items-center gap-1
                    "
                  >
                    ✕ Remove
                  </button>
                </div>
              </div>

              {/* Book Info */}
              <div className="p-4">
                <h4 className="font-bold text-gray-800 mb-1 line-clamp-1" title={book.title}>
                  {book.title}
                </h4>
                <p className="text-gray-600 text-sm mb-2 line-clamp-1">
                  {book.author_name?.[0] || "Unknown Author"}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {book.first_publish_year || "Year N/A"}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/book/${getBookId(book.key)}`);
                    }}
                    className="text-blue-600 text-sm font-medium hover:text-blue-700"
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