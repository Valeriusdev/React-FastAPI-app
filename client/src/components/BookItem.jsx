const BookItem = ({ book, onDelete }) => (
  <li className="flex items-center gap-2 bg-white border-2 border-blue-300 hover:border-blue-600 rounded px-3 py-1.5 transition-colors">
    {book.title}
    <button
      onClick={() => onDelete(book.id)}
      className="ml-auto text-red-400 hover:text-red-600 hover:bg-red-50 rounded px-1.5 py-0.5 transition-colors"
      aria-label="Delete book"
    >
      &times;
    </button>
  </li>
);

export default BookItem;
