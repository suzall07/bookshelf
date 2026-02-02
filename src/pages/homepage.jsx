import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
        "https://openlibrary.org/subjects/fantasy.json?limit=2"
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
    <div className="space-y-10 bg-[#FAF9F7]">
      {/* Welcome Section */}
      <section className="bg-white border border-[#E6DED6] rounded-2xl p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-[#3E2C1C] mb-4">
          The Infinite Bookshelf
        </h1>

        <div className="flex items-center gap-4">
          <div className="bg-[#FBF8F5] border border-[#E6DED6] rounded-xl p-4 flex-1">
            <p className="text-sm text-[#7A5C45]">Books on your shelf</p>
            <p className="text-3xl font-bold text-[#3E2C1C]">
              {shelf.length}
            </p>
          </div>

          <Link
            to="/search"
            className="bg-[#6F4E37] text-white px-6 py-3 rounded-xl font-medium
                       hover:bg-[#5C3F2B] transition shadow-sm"
          >
            Search Books →
          </Link>
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="bg-white border border-[#E6DED6] rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#3E2C1C]">
            Recommended Reads
          </h2>
          <button
            onClick={fetchRecommendations}
            className="px-4 py-2 border border-[#D6C6B8] rounded-lg
                       text-[#6F4E37] hover:bg-[#FBF8F5] transition"
          >
            Refresh
          </button>
        </div>

        {loadingRec ? (
          <div className="flex justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6F4E37] mx-auto"></div>
              <p className="mt-4 text-sm text-[#7A5C45]">
                Brewing recommendations…
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
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
      </section>

      {/* Stats Section */}
      <section className="bg-white border border-[#E6DED6] rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#3E2C1C] mb-4">
          Reading Stats
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBox label="Total Books" value={shelf.length} />
          <StatBox
            label="Authors"
            value={new Set(shelf.map(b => b.author_name?.[0])).size}
          />
          <StatBox
            label="Classics"
            value={shelf.filter(b => b.first_publish_year < 2000).length}
          />
          <StatBox
            label="Avg. Year"
            value={
              shelf.length
                ? Math.round(
                    shelf.reduce(
                      (sum, b) => sum + (b.first_publish_year || 2024),
                      0
                    ) / shelf.length
                  )
                : 0
            }
          />
        </div>
      </section>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="bg-[#FBF8F5] border border-[#E6DED6] p-4 rounded-xl text-center">
      <p className="text-2xl font-semibold text-[#6F4E37]">{value}</p>
      <p className="text-sm text-[#7A5C45]">{label}</p>
    </div>
  );
}