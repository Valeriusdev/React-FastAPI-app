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
    } catch (err) {
      setError("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (err) {
      setError("Failed to delete book.");
    }
  };

  const addBook = async (bookTitle) => {
    try {
      const { data } = await api.post("/books", { title: bookTitle });
      setBooks((prev) => [...prev, data]);
    } catch (err) {
      setError("Failed to add book.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Books List</h2>
      {loading && <p>Loading...</p>}
      {!loading &&
        (books.length === 0 ? (
          <p className="mb-4">No books yet</p>
        ) : (
          <ul>
            {books.map((book) => (
              <BookItem key={book.id} book={book} onDelete={deleteBook} />
            ))}
          </ul>
        ))}
      <AddBookForm addBook={addBook} />
      <ErrorMessage message={error} onDismiss={() => setError(null)} />
    </div>
  );
};

export default BookList;
