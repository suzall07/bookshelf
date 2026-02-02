import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function BookDetailsPage({ shelf, setShelf }) {
  const { bookKey } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isSaved = shelf.some(b => b.key === `/works/${bookKey}` || b.key === bookKey);

  useEffect(() => {
    async function fetchBookDetails() {
      setLoading(true);
      try {
        // Fetch book details
        const bookRes = await fetch(`https://openlibrary.org${bookKey}.json`);
        const bookData = await bookRes.json();
        
        // Fetch author details if available
        let authorName = "Unknown Author";
        if (bookData.authors && bookData.authors[0]?.author?.key) {
          try {
            const authorRes = await fetch(`https://openlibrary.org${bookData.authors[0].author.key}.json`);
            const authorData = await authorRes.json();
            authorName = authorData.name;
          } catch {
            authorName = bookData.authors[0]?.name || "Unknown Author";
          }
        }

        setBook({
          key: bookKey,
          title: bookData.title,
          author_name: [authorName],
          cover_i: bookData.covers?.[0],
          first_publish_year: bookData.first_publish_date,
          description: bookData.description?.value || bookData.description
        });

        setDescription(bookData.description?.value || bookData.description || "No description available.");
      } catch (err) {
        setError("Failed to load book details. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (bookKey) {
      fetchBookDetails();
    }
  }, [bookKey]);

  const handleSaveBook = () => {
    if (!book || isSaved) return;
    
    const bookToSave = {
      key: book.key,
      title: book.title,
      author_name: book.author_name,
      cover_i: book.cover_i,
      first_publish_year: book.first_publish_year,
      coverUrl: book.cover_i 
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : null
    };
    
    setShelf([...shelf, bookToSave]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">📚</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Book Not Found</h1>
          <p className="text-gray-600 mb-6">{error || "The book you're looking for doesn't exist."}</p>
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const coverUrl = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Book Details</h1>
        </div>

        {/* Book Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Cover Image */}
            <div className="md:w-1/3 p-8 bg-gradient-to-br from-gray-50 to-blue-50">
              {coverUrl ? (
                <img 
                  src={coverUrl} 
                  alt={book.title}
                  className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-5xl text-gray-400">📖</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="md:w-2/3 p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{book.title}</h2>
                  <p className="text-gray-600 mb-1">
                    <span className="font-semibold">Author:</span> {book.author_name?.[0] || "Unknown"}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Published:</span> {book.first_publish_year || "Unknown"}
                  </p>
                </div>
                
                {/* Save Button */}
                <button
                  onClick={handleSaveBook}
                  disabled={isSaved}
                  className={`
                    px-6 py-3 rounded-lg font-semibold transition-all duration-200
                    ${isSaved 
                      ? "bg-green-100 text-green-700 cursor-not-allowed" 
                      : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover:shadow-lg"
                    }
                  `}
                >
                  {isSaved ? "✓ Saved to Shelf" : "⭐ Save to Shelf"}
                </button>
              </div>

              {/* Description */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
                <div className="prose max-w-none text-gray-700">
                  {description ? (
                    <p className="whitespace-pre-line">{description}</p>
                  ) : (
                    <p className="text-gray-500 italic">No description available for this book.</p>
                  )}
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Book Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">OpenLibrary ID</p>
                    <p className="font-mono text-sm truncate">{bookKey.split('/').pop()}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-semibold">
                      {isSaved ? "In Your Library" : "Not Saved"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}