import { useState } from "react";

const BookItem = ({ book, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await onDelete(book.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <li className="flex items-center gap-2 bg-white border-2 border-blue-300 hover:border-blue-600 rounded px-3 py-1.5 transition-colors">
      {book.title}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className={`ml-auto rounded px-1.5 py-0.5 transition-colors ${
          isDeleting
            ? "text-red-200"
            : "text-red-400 hover:text-red-600 hover:bg-red-50"
        }`}
        aria-label="Delete book"
      >
        &times;
      </button>
    </li>
  );
};

export default BookItem;
