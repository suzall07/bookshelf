import { useEffect, useState } from "react";
import BookCard from "./BookCard";

export default function SearchBar({ shelf, setShelf }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      fetchBooks();
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  async function fetchBooks() {
    setLoading(true);

    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${query}`
      );
      const data = await res.json();
      setResults(data.docs.slice(0, 10));
    } catch (error) {
      console.error("API Error:", error);
    }

    setLoading(false);
  }

  return (
    <>
      <input
        placeholder="Search books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: 10, width: "100%", marginBottom: 15 }}
      />

      {loading && <p>the books will be loading soon...</p>}

      {results.map((book) => (
        <BookCard
          key={book.key}
          book={book}
          shelf={shelf}
          setShelf={setShelf}
        />
      ))}
    </>
  );
}
