import React, { useState } from "react";

const AddBookForm = ({ addBook }) => {
  const [bookTitle, setBookTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookTitle.trim()) {
      addBook(bookTitle);
      setBookTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
        placeholder="Enter book title"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded transition-colors"
      >
        Add Book
      </button>
    </form>
  );
};

export default AddBookForm;
