export default function BookCard({ book, shelf, setShelf }) {
  const isSaved = shelf.some((b) => b.key === book.key);

  function saveBook() {
    if (isSaved) return;
    setShelf([...shelf, book]);
  }

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  return (
    <div
      style={{
        display: "flex",
        gap: 15,
        border: "1px solid #ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
      }}
    >
      {coverUrl && <img src={coverUrl} width="80" />}

      <div>
        <h3>{book.title}</h3>
        <p>{book.author_name?.[0]}</p>

        <button onClick={saveBook} disabled={isSaved}>
          {isSaved ? "Already Saved" : "Save to My Shelf"}
        </button>
      </div>
    </div>
  );
}
