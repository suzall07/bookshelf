export default function Shelf({ shelf }) {
  return (
    <div>
      {shelf.map((book) => (
        <div
          key={book.key}
          style={{
            display: "flex",
            gap: 15,
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
            borderRadius: 8,
          }}
        >
          {book.cover_i && (
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              width="80"
              alt={book.title}
            />
          )}
          <div>
            <h3>{book.title}</h3>
            <p>{book.author_name?.[0] || "Unknown Author"}</p>
            {book.first_publish_year && (
              <small>Published: {book.first_publish_year}</small>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}