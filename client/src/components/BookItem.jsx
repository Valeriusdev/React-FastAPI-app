const BookItem = ({ book, onDelete }) => (
  <li className="flex items-center gap-2">
    {book.title}
    <button
      onClick={() => onDelete(book.id)}
      className="text-red-500 hover:text-red-700 font-bold"
      aria-label="Delete book"
    >
      &times;
    </button>
  </li>
);

export default BookItem;
