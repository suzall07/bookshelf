import React from "react";
import { useNavigate } from "react-router-dom";

export default function BookCard({ book, shelf, setShelf }) {
  const navigate = useNavigate();
  const isSaved = shelf.some((b) => b.key === book.key);
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  const getBookId = () => {
    if (!book.key) return "";
    if (book.key.includes("/")) {
      return book.key.split("/").pop();
    }
    return book.key;
  };

  const bookId = getBookId();

  function saveBook(e) {
    e.stopPropagation();
    if (isSaved) return;
    
    const bookToSave = {
      key: book.key,
      title: book.title,
      author_name: book.author_name,
      cover_i: book.cover_i,
      first_publish_year: book.first_publish_year,
      coverUrl: coverUrl
    };
    
    setShelf([...shelf, bookToSave]);
  }

  return (
    <div 
      onClick={() => navigate(`/book/${bookId}`)}
      className="
        flex gap-4 p-5 mb-4 cursor-pointer max-w-2xl mx-auto
        border-2 border-gray-200 rounded-xl shadow-md 
        hover:shadow-lg hover:border-purple-300 transition-all duration-300
        bg-white hover:bg-gradient-to-r hover:from-white hover:to-blue-50
      "
    >
      <div className="relative">
        {coverUrl ? (
          <img 
            src={coverUrl} 
            alt={book.title}
            className="w-24 h-36 rounded-lg shadow-lg object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-24 h-36 rounded-lg bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
            <span className="text-gray-400 text-sm px-2">📚 No Cover</span>
          </div>
        )}
        
        {isSaved && (
          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
            ✓ Saved
          </div>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {book.title}
        </h3>
        
        <div className="flex items-center gap-2 mb-1">
          <span className="text-gray-500">👤</span>
          <p className="text-gray-700">
            <strong>Author:</strong> {book.author_name?.[0] || "Unknown"}
          </p>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-gray-500">📅</span>
          <p className="text-gray-600">
            <strong>Year:</strong> {book.first_publish_year || "Unknown"}
          </p>
        </div>

        <div className="flex gap-3">
          {isSaved ? (
            <button 
              disabled
              className="
                px-4 py-2 rounded-lg
                bg-gradient-to-r from-green-100 to-green-200
                text-green-700 font-semibold
                border border-green-300
                flex items-center gap-2
                opacity-90 cursor-not-allowed
              "
            >
              <span className="text-lg">✓</span>
              <span>Already Saved</span>
            </button>
          ) : (
            <button 
              onClick={saveBook}
              className="
                px-4 py-2 rounded-lg
                bg-gradient-to-r from-blue-500 to-purple-500
                hover:from-blue-600 hover:to-purple-600
                text-white font-semibold
                transform hover:scale-105
                transition-all duration-200
                shadow-md hover:shadow-lg
                flex items-center gap-2
              "
            >
              <span className="text-lg">⭐</span>
              <span>Save to My Shelf</span>
            </button>
          )}
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/book/${bookId}`);
            }}
            className="
              px-4 py-2 rounded-lg
              border-2 border-blue-200
              text-blue-600 font-medium
              hover:bg-blue-50 transition-colors duration-200
            "
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}