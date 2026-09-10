import React, { useState, useRef, useEffect } from "react";

const AddBookForm = ({ addBook }) => {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const successTimer = useRef(null);

  useEffect(() => {
    return () => clearTimeout(successTimer.current);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookTitle.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await addBook({
        title: bookTitle.trim(),
        author: author.trim() || null,
        release_year: releaseYear ? Number(releaseYear) : null,
      });
      setBookTitle("");
      setAuthor("");
      setReleaseYear("");
      clearTimeout(successTimer.current);
      setShowSuccess(true);
      successTimer.current = setTimeout(() => setShowSuccess(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <input
          aria-label="Book title"
          type="text"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          placeholder="Enter book title"
          disabled={isSubmitting}
          className="flex-1 border border-gray-300 text-sm px-4 py-2 rounded outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition-colors disabled:opacity-50"
        />
        <input
          aria-label="Author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          disabled={isSubmitting}
          className="flex-1 border border-gray-300 text-sm px-4 py-2 rounded outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition-colors disabled:opacity-50"
        />
        <input
          aria-label="Release year"
          type="number"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          placeholder="Year"
          disabled={isSubmitting}
          className="w-24 border border-gray-300 text-sm px-4 py-2 rounded outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isSubmitting || !bookTitle.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
