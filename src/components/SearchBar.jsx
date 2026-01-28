import { useState, useEffect } from "react";
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
    <div>
      <h2>Search Books</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
        style={{ padding: "8px", width: "300px" }}
      />
      {loading && <p>Loading...</p>}
      
      <div style={{ marginTop: 20 }}>
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              shelf={shelf}
              setShelf={setShelf}
            />
          ))
        ) : (
          !loading && query && <p>No results found</p>
        )}
      </div>
    </div>
  );
}