import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Shelf from "./components/Shelf";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function App() {
  const [shelf, setShelf] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Load shelf from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("shelf")) || [];
    setShelf(saved);
    setHydrated(true);
  }, []);

  // Save shelf to localStorage whenever it changes
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("shelf", JSON.stringify(shelf));
    }
  }, [shelf, hydrated]);

  return (
    <Router>
      <div style={{ padding: 20 }}>
        <h1>The Infinite Bookshelf</h1>

        {/* Navigation */}
        <nav style={{ marginBottom: 20 }}>
          <Link to="/" style={{ marginRight: 10 }}>Search</Link>
          <Link to="/shelf">My Shelf</Link>
        </nav>

        {hydrated && (
          <Routes>
            <Route
              path="/"
              element={<SearchBar shelf={shelf} setShelf={setShelf} />}
            />
            <Route path="/shelf" element={<Shelf shelf={shelf} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}
