import React from "react";
import { useNavigate } from "react-router-dom";
import { useBookContext } from "../context/BookContext";

export default function BookCard({ book }) {
  const navigate = useNavigate();
  const { isBookSaved, addToShelf } = useBookContext();
  const isSaved = isBookSaved(book.key);
  const coverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null;
  const bookId = book.key?.includes("/") ? book.key.split("/").pop() : book.key || "";

  const saveBook = (e) => {
    e.stopPropagation();
    if (!isSaved) addToShelf({ ...book, coverUrl });
  };

  return (
    <div 
      onClick={() => navigate(`/book/${bookId}`)}
      className="flex gap-4 p-5 mb-4 cursor-pointer max-w-2xl mx-auto border-2 border-amber-200 rounded-xl shadow-md hover:shadow-lg hover:border-amber-400 transition-all bg-white hover:bg-amber-50"
    >
      <div className="relative">
        {coverUrl ? (
          <img src={coverUrl} alt={book.title} className="w-24 h-36 rounded-lg shadow-lg object-cover hover:scale-105 transition-transform" />
        ) : (
          <div className="w-24 h-36 rounded-lg bg-amber-100 flex items-center justify-center">
            <span className="text-amber-600 text-sm px-2">📚 No Cover</span>
          </div>
        )}
        
        {isSaved && (
          <div className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full shadow-md">
            ✓ Saved
          </div>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2 text-amber-700">
          {book.title}
        </h3>
        
        {[
          { icon: "👤", label: "Author", value: book.author_name?.[0] || "Unknown" },
          { icon: "📅", label: "Year", value: book.first_publish_year || "Unknown" }
        ].map(({ icon, label, value }) => (
          <div key={label} className="flex items-center gap-2 mb-1">
            <span className="text-amber-600">{icon}</span>
            <p className="text-gray-700"><strong>{label}:</strong> {value}</p>
          </div>
        ))}

        <div className="flex gap-3 mt-4">
          <button 
            onClick={saveBook}
            disabled={isSaved}
            className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${
              isSaved 
                ? "bg-green-100 text-green-700 border border-green-300 opacity-90 cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-700 text-white transform hover:scale-105 transition-all shadow-md hover:shadow-lg"
            }`}
          >
            <span className="text-lg">{isSaved ? "✓" : "⭐"}</span>
            <span>{isSaved ? "Already Saved" : "Save to My Shelf"}</span>
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/book/${bookId}`); }}
            className="px-4 py-2 rounded-lg border-2 border-amber-300 text-amber-700 font-medium hover:bg-amber-50 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}