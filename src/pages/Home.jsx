import { useState } from "react";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import BookDescription from "../components/BookDescription";

export default function Home({ shelf, setShelf }) {
  const [results, setResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      <SearchBar setResults={setResults} />

      {results.map((book) => (
        <BookCard
          key={book.key}
          book={book}
          shelf={shelf}
          setShelf={setShelf}
          setSelectedBook={setSelectedBook}
        />
      ))}

      <BookDescription
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </div>
  );
}
