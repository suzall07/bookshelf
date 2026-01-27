export default function BookCard({ book, shelf, setShelf }) {
  const isaved + shelf.some((b)=> b.key==book.key);

  function saveBook(){
    if(isSaved) return;

    setShelf([..shelf,book]);
  }
    const coverUrl = < className=cover_i
    ?'https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg'
    : null;

