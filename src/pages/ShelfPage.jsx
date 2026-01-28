import { useState } from "react";
import BookDescription from "../components/BookDescription";

export default function ShelfPage({ shelf, setShelf }) {
  const [selectedBook, setSelectedBook] = useState(null);

  function removeBook(key) {
    setShelf(shelf.filter(book => book.key !== key));
  }

  return (
    <div>
      <h2>📚 My Shelf ({shelf.length} books)</h2>
      
      {shelf.length === 0 ? (
        <p>Your shelf is empty. Search for books to add them!</p>
      ) : (
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {shelf.map((book) => (
            <div 
              key={book.key} 
              style={{ 
                width: 150, 
                border: "1px solid #ddd",
                padding: 10,
                borderRadius: 8,
                cursor: "pointer"
              }}
              onClick={() => setSelectedBook(book)}
            >
              {book.coverUrl ? (
                <img 
                  src={book.coverUrl} 
                  alt={book.title}
                  style={{ width: "100%", height: 200, objectFit: "cover" }} 
                />
              ) : (
                <div style={{ 
                  width: "100%", 
                  height: 200, 
                  background: "#eee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  No Cover
                </div>
              )}
              <h4 style={{ margin: "10px 0 5px 0", fontSize: 14 }}>
                {book.title}
              </h4>
              <p style={{ margin: 0, fontSize: 12, color: "#666" }}>
                {book.author_name?.[0] || "Unknown"}
              </p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  removeBook(book.key);
                }}
                style={{
                  marginTop: 10,
                  padding: "5px 10px",
                  background: "#ff4444",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer"
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <BookDescription
        book={selectedBook}
        isVisible={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </div>
  );
}