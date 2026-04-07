import React, { useEffect, useState } from "react";
import api from "../api.js";
import AddBookForm from "./AddBookForm";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await api.get("/books");
      setBooks(response.data.books);
    } catch (error) {
      console.error("Error fetching books", error);
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (bookTitle) => {
    try {
      await api.post("/books", { title: bookTitle });
      fetchBooks(); // Refresh the list after adding a book
    } catch (error) {
      console.error("Error adding book", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Books List</h2>
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
