import React from "react";
import SearchBar from "../components/SearchBar";

export default function SearchPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-amber-900">🔍 Search Books</h1>
      <p className="text-gray-600 mb-6">Search for books from OpenLibrary and add them to your shelf!</p>
      <SearchBar />
    </div>
  );
}