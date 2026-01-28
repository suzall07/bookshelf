import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import ShelfPage from "./pages/ShelfPage";
import HomePage from "./pages/HomePage";

export default function App() {
  const [shelf, setShelf] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("bookshelf");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setShelf(parsed || []);
      } catch {
        setShelf([]);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("bookshelf", JSON.stringify(shelf));
    }
  }, [shelf, isLoaded]);

  if (!isLoaded) {
    return <div>Loading your library...</div>;
  }

  return (
    <Router>
      <div style={{ padding: 20 }}>
        <h1>The Infinite Bookshelf</h1>
        <nav>
          <Link to="/" style={{ marginRight: 10 }}>Home</Link>
          <Link to="/search" style={{ marginRight: 10 }}>Search</Link>
          <Link to="/shelf">My Shelf ({shelf.length})</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage shelf={shelf} setShelf={setShelf} />} />
          <Route path="/search" element={<SearchBar shelf={shelf} setShelf={setShelf} />} />
          <Route path="/shelf" element={<ShelfPage shelf={shelf} setShelf={setShelf} />} />
        </Routes>
      </div>
    </Router>
  );
}