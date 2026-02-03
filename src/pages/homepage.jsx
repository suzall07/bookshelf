import React from "react";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import { useBookContext } from "../pages/BookContext";
import { useRecommendations } from "../hooks/useBooks";

export default function HomePage() {
  const { shelf } = useBookContext();
  
  const { 
    data: recommendationsData, 
    isLoading: loadingRec, 
    refetch: fetchRecommendations,
    isError: recError 
  } = useRecommendations();

  const recommendations = recommendationsData?.works || [];

  const stats = [
    { label: "Total Books", value: shelf.length },
    { label: "Authors", value: new Set(shelf.map(b => b.author_name?.[0])).size },
    { label: "Classics", value: shelf.filter(b => b.first_publish_year < 2000).length }
  ];

  return (
    <div className="space-y-10 bg-amber-50/30">
      <section className="bg-white border border-amber-200 rounded-2xl p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-amber-900 mb-4">The Infinite Bookshelf</h1>
        <div className="flex items-center gap-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex-1">
            <p className="text-sm text-amber-700">Books on your shelf</p>
            <p className="text-3xl font-bold text-amber-900">{shelf.length}</p>
          </div>
          <Link to="/search" className="bg-amber-700 text-white px-6 py-3 rounded-xl font-medium hover:bg-amber-800 transition shadow-sm">
            Search Books →
          </Link>
        </div>
      </section>

      <section className="bg-white border border-amber-200 rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-amber-900">Recommended Reads</h2>
          <button 
            onClick={fetchRecommendations} 
            className="px-4 py-2 border border-amber-300 rounded-lg text-amber-800 hover:bg-amber-50 transition"
          >
            Refresh
          </button>
        </div>

        {loadingRec ? (
          <div className="flex justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-700 mx-auto"></div>
              <p className="mt-4 text-sm text-amber-700">Brewing recommendations…</p>
            </div>
          </div>
        ) : recError ? (
          <div className="text-center py-12">
            <p className="text-red-600">Failed to load recommendations</p>
            <button 
              onClick={fetchRecommendations} 
              className="mt-2 px-4 py-2 text-sm text-amber-700 hover:text-amber-900"
            >
              Retry
            </button>
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
              />
            ))}
          </div>
        )}
      </section>

      <section className="bg-white border border-amber-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-amber-900 mb-4">Reading Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
          {stats.map(({ label, value }) => (
            <div key={label} className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-center">
              <p className="text-2xl font-semibold text-amber-800">{value}</p>
              <p className="text-sm text-amber-700">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}