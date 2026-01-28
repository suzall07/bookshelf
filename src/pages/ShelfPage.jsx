import Shelf from "../components/Shelf";

export default function ShelfPage({ shelf }) {
  return (
    <div style={{ padding: 20 }}>
      <h2>📖 My Shelf</h2>
      <p style={{ color: "#555", marginBottom: 15 }}>
        Here are the books you've saved to your personal library.
      </p>

      {shelf.length === 0 ? (
        <p style={{ color: "#777" }}>No books saved yet. Go to Search and add some!</p>
      ) : (
        <Shelf shelf={shelf} />
      )}
    </div>
  );
}