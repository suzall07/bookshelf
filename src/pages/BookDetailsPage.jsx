import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBookContext } from "../pages/BookContext";
import { useBookDetails } from "../hooks/useBooks";

export default function BookDetailsPage() {
  const { bookKey } = useParams();
  const navigate = useNavigate();
  const { isBookSaved, addToShelf } = useBookContext();
  
  const { 
    data: book, 
    isLoading: loading, 
    isError,
    error 
  } = useBookDetails(bookKey);

  const isSaved = isBookSaved(`/works/${bookKey}`) || isBookSaved(bookKey);

  const handleSaveBook = () => {
    if (!book || isSaved) return;
    addToShelf({
      key: `/works/${bookKey}`,
      title: book.title,
      author_name: book.author_name,
      cover_i: book.cover_i,
      first_publish_year: book.first_publish_year,
      coverUrl: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <div className="text-5xl mb-4">📚</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Book Not Found</h1>
          <p className="text-gray-600 mb-6">{error?.message || "The book you're looking for doesn't exist."}</p>
          <button onClick={() => navigate(-1)} className="px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800">Go Back</button>
        </div>
      </div>
    );
  }

  const coverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : null;
  const bookInfo = [
    { label: "OpenLibrary ID", value: bookKey.split('/').pop() },
    { label: "Status", value: isSaved ? "In Your Library" : "Not Saved" }
  ];

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-6">← Back</button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 p-8 bg-amber-50">
              {coverUrl ? (
                <img src={coverUrl} alt={book.title} className="w-full max-w-sm mx-auto rounded-lg shadow-lg" />
              ) : (
                <div className="w-full h-64 bg-amber-200 rounded-lg flex items-center justify-center">
                  <span className="text-5xl text-amber-600">📖</span>
                </div>
              )}
            </div>

            <div className="md:w-2/3 p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{book.title}</h2>
                  <p className="text-gray-600 mb-1"><span className="font-semibold">Author:</span> {book.author_name?.[0]}</p>
                  <p className="text-gray-600"><span className="font-semibold">Published:</span> {book.first_publish_year || "Unknown"}</p>
                </div>
                
                <button
                  onClick={handleSaveBook}
                  disabled={isSaved}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${isSaved ? "bg-green-100 text-green-700 cursor-not-allowed" : "bg-amber-600 hover:bg-amber-700 text-white hover:shadow-lg"}`}
                >
                  {isSaved ? "✓ Saved" : "⭐ Save"}
                </button>
              </div>

              <div className="border-t border-amber-200 pt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
                <p className="text-gray-700 whitespace-pre-line">{book.description}</p>
              </div>

              <div className="mt-8 pt-6 border-t border-amber-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Book Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  {bookInfo.map(({ label, value }) => (
                    <div key={label} className="bg-amber-50 p-3 rounded-lg">
                      <p className="text-sm text-amber-700">{label}</p>
                      <p className={label === "OpenLibrary ID" ? "font-mono text-sm truncate" : "font-semibold"}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}