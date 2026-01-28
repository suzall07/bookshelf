{book.cover_i ? (
  <img
    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
    width="80"
    alt={book.title}
  />
) : (
  <div style={{ width: 80, height: 120, background: "#eee" }} />
)}
