import { useEffect, useState } from "react";
import api from "../api.js";
import AddBookForm from "./AddBookForm";
import BookItem from "./BookItem";
import ErrorMessage from "./ErrorMessage";

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

  const deleteBook = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (error) {
      setError("Failed to delete book.");
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
      <ErrorMessage message={error} onDismiss={() => setError(null)} />
      <h2>Books List</h2>
      {loading && <p>Loading...</p>}
      {!loading && books.length === 0 ? (
        <p className="mb-4">No books yet</p>
      ) : (
        <ul>
          {books.map((book) => (
            <BookItem key={book.id} book={book} onDelete={deleteBook} />
          ))}
        </ul>
      )}
      <AddBookForm addBook={addBook} />
    </div>
  );
};

export default BookList;
