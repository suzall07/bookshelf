import React from "react";  // ADD THIS
import SearchBar from "../components/SearchBar";

export default function SearchPage({ shelf, setShelf }) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🔍 Search Books</h1>
      <p className="text-gray-600 mb-6">Search for books from OpenLibrary and add them to your shelf!</p>
      <SearchBar shelf={shelf} setShelf={setShelf} />
    </div>
  );
}