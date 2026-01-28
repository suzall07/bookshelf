import { useState, useEffect } from "react";

export default function BookDescription({ book, isVisible, onClose }) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!book?.key) return;

    async function fetchDescription() {
      setLoading(true);
      try {
        const res = await fetch(`https://openlibrary.org${book.key}.json`);
        const data = await res.json();
        setDescription(data.description?.value || data.description || "No description available.");
      } catch {
        setDescription("Unable to load description.");
      } finally {
        setLoading(false);
      }
    }

    fetchDescription();
  }, [book]);

  if (!isVisible || !book) return null;

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <div style={{
        background: "white",
        padding: 20,
        borderRadius: 10,
        maxWidth: 600,
        maxHeight: "80vh",
        overflowY: "auto"
      }}>
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          {coverUrl && (
            <img 
              src={coverUrl} 
              alt={book.title}
              style={{ width: 150, height: 200, objectFit: "cover" }}
            />
          )}
          <div style={{ flex: 1 }}>
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author_name?.[0] || "Unknown"}</p>
            <p><strong>Published:</strong> {book.first_publish_year || "Unknown"}</p>
          </div>
        </div>
        
        <h4>Description</h4>
        {loading ? <p>Loading description...</p> : <p>{description}</p>}
        
        <button 
          onClick={onClose}
          style={{ marginTop: 20, padding: "8px 16px" }}
        >
          Close
        </button>
      </div>
    </div>
  );
}