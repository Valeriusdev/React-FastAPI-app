import React, { useEffect, useState } from "react";
import api from "../api.js";
import AddBookForm from "./AddBookForm";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/books");
      setBooks(response.data.books);
    } catch (error) {
      setError("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (bookTitle) => {
    try {
      await api.post("/books", { title: bookTitle });
      fetchBooks(); // Refresh the list after adding a book
    } catch (error) {
      setError("Failed to add book.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Books List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}
      {!loading && books.length === 0 ? (
        <p>No books yet</p>
      ) : (
        <ul>
          {books.map((book, index) => (
            <li key={index}>{book.title}</li>
          ))}
        </ul>
      )}
      <AddBookForm addBook={addBook} />
    </div>
  );
};

export default BookList;
