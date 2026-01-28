import { useState } from "react";
import BookDescription from "./BookDescription";

export default function BookCard({ book, shelf, setShelf }) {
  const [showDesc, setShowDesc] = useState(false);
  const isSaved = shelf.some((b) => b.key === book.key);

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

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
    <>
      <div 
        onClick={() => setShowDesc(true)}
        style={{
          display: "flex",
          gap: 15,
          border: "1px solid #ccc",
          padding: 10,
          marginBottom: 10,
          cursor: "pointer",
          maxWidth: "600px"
        }}
      >
        {coverUrl ? (
          <img src={coverUrl} width="80" alt={book.title} />
        ) : (
          <div style={{ width: 80, height: 120, background: "#eee" }} />
        )}

        <div>
          <h3>{book.title}</h3>
          <p><strong>Author:</strong> {book.author_name?.[0] || "Unknown"}</p>
          <p><strong>Year:</strong> {book.first_publish_year || "Unknown"}</p>

          {isSaved ? (
            <button disabled style={{ opacity: 0.6, cursor: "not-allowed" }}>
              ✓ Already Saved
            </button>
          ) : (
            <button onClick={saveBook}>Save to My Shelf</button>
          )}
        </div>
      </div>

      <BookDescription
        book={book}
        isVisible={showDesc}
        onClose={() => setShowDesc(false)}
      />
    </>
  );
}