import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Shelf from "./components/Shelf";

export default function App() {
  const [shelf, setShelf] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("shelf")) || [];
    setShelf(saved);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("shelf", JSON.stringify(shelf));
    }
  }, [shelf, hydrated]);

  return (
    <div style={{ padding: 20 }}>
      <h1>The Infinite Bookshelf</h1>

      {hydrated && (
        <>
          <SearchBar shelf={shelf} setShelf={setShelf} />
          <Shelf shelf={shelf} />
        </>
      )}
    </div>
  );
}
