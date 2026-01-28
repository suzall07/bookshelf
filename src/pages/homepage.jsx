import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";

export default function HomePage({ shelf, setShelf }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRec, setLoadingRec] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  async function fetchRecommendations() {
    setLoadingRec(true);
    try {
      const res = await fetch(
        "https://openlibrary.org/subjects/fantasy.json?limit=5"
      );
      const data = await res.json();
      setRecommendations(data.works || []);
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
    } finally {
      setLoadingRec(false);
    }
  }

  return (
    <div>
      <h1>Welcome to The Infinite Bookshelf</h1>
      
      <div style={{ background: "#f5f5f5", padding: 15, borderRadius: 8, marginBottom: 20 }}>
        <p>📚 <strong>Your Stats:</strong> {shelf.length} books saved</p>
      </div>

      <div style={{ marginBottom: 40 }}>
        <h2>📖 Recommended Books</h2>
        <button 
          onClick={fetchRecommendations}
          style={{ marginBottom: 15, padding: "8px 16px" }}
        >
          Refresh Recommendations
        </button>
        
        {loadingRec ? (
          <p>Loading recommendations...</p>
        ) : (
          <div>
            {recommendations.map((work) => (
              <BookCard
                key={work.key}
                book={{
                  key: work.key,
                  title: work.title,
                  author_name: work.authors?.map(a => a.name),
                  cover_i: work.cover_id,
                  first_publish_year: work.first_publish_year
                }}
                shelf={shelf}
                setShelf={setShelf}
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <h2>🔍 Search Books</h2>
        <SearchBar shelf={shelf} setShelf={setShelf} />
      </div>
    </div>
  );
}