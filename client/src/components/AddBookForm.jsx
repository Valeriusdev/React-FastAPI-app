import React, { useState, useRef } from "react";

const AddBookForm = ({ addBook }) => {
  const [bookTitle, setBookTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const successTimer = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookTitle.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await addBook(bookTitle.trim());
      setBookTitle("");
      clearTimeout(successTimer.current);
      setShowSuccess(true);
      successTimer.current = setTimeout(() => setShowSuccess(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          placeholder="Enter book title"
          disabled={isSubmitting}
          className="border border-gray-300 text-sm px-4 py-2 rounded outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isSubmitting || !bookTitle.trim()}
          className="ml-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Adding..." : "Add Book"}
        </button>
      </form>
      {showSuccess && (
        <p className="mt-2 text-xs text-green-600">Book added!</p>
      )}
    </div>
  );
};

export default AddBookForm;
