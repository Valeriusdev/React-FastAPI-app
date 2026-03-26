import React, { useState } from "react";

const AddBookForm = ({ addBook }) => {
  const [bookTitle, setBookTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookTitle.trim() || isSubmitting) return;
    setIsSubmitting(true);
    await addBook(bookTitle.trim());
    setBookTitle("");
    setIsSubmitting(false);
  };

  return (
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
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Adding..." : "Add Book"}
      </button>
    </form>
  );
};

export default AddBookForm;
