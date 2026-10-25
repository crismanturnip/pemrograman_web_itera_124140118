import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

// Context membuat data buku dapat diakses lintas halaman tanpa prop drilling.
const BookContext = createContext();

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus digunakan di dalam BookProvider');
  }
  return context;
}

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('personal_books', []);

  // Seluruh operasi CRUD dipusatkan di Provider.
  const addBook = (bookData) => {
    const newBook = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...bookData,
    };
    setBooks((current) => [...current, newBook]);
  };

  const updateBook = (id, bookData) => {
    setBooks((current) =>
      current.map((book) => (book.id === id ? { ...book, ...bookData } : book))
    );
  };

  const deleteBook = (id) => {
    setBooks((current) => current.filter((book) => book.id !== id));
  };

  const value = { books, addBook, updateBook, deleteBook };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
