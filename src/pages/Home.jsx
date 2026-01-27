import SearchBar from "../components/SearchBar";

export default function Home({ shelf, setShelf }) {
  return (
    <div style={{ padding: 20 }}>
      <h2>🔍 Find Books</h2>
      <p style={{ color: "#555", marginBottom: 15 }}>
        Search for books and add them to your personal shelf.
      </p>
      <SearchBar shelf={shelf} setShelf={setShelf} />
    </div>
  );
}
