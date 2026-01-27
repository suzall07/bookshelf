export default function Shelf({ shelf }) {
  return (
    <div>
      {shelf.map((book, i) => (
        <p key={i}>{book.title}</p>
      ))}
    </div>
  );
}
