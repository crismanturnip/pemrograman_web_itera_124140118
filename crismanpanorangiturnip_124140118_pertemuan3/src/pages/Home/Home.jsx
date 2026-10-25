import { useMemo, useState } from 'react';
import Header from '../../components/Header/Header';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';
import { useBooks } from '../../context/BookContext';
import './Home.css';

function Home() {
  const { books, addBook, updateBook, deleteBook } = useBooks();
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('semua');

  // Filter dan pencarian dihitung ulang hanya ketika data/filter berubah.
  const filteredBooks = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    return books.filter((book) => {
      const matchStatus = statusFilter === 'semua' || book.status === statusFilter;
      const matchSearch = !query ||
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query);
      return matchStatus && matchSearch;
    });
  }, [books, searchTerm, statusFilter]);

  const handleSave = (bookData) => {
    if (editingBook) {
      updateBook(editingBook.id, bookData);
      setEditingBook(null);
    } else {
      addBook(bookData);
    }
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm('Hapus buku ini?');
    if (confirmed) {
      deleteBook(id);
      if (editingBook?.id === id) setEditingBook(null);
    }
  };

  return (
    <>
      <Header
        title="Rak Buku Pribadi"
        description="Catat buku yang dimiliki, sedang dibaca, atau ingin dibeli."
      />
      <main className="page-container page-section home-grid">
        <aside>
          <BookForm
            initialBook={editingBook}
            onSubmit={handleSave}
            onCancel={() => setEditingBook(null)}
          />
        </aside>

        <section className="library-panel">
          <div className="panel-heading">
            <div>
              <p className="small-label">koleksi</p>
              <h2>Daftar Buku</h2>
            </div>
            <strong>{filteredBooks.length} buku</strong>
          </div>
          <BookFilter
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            onSearchChange={setSearchTerm}
            onStatusChange={setStatusFilter}
          />
          <BookList books={filteredBooks} onEdit={setEditingBook} onDelete={handleDelete} />
        </section>
      </main>
    </>
  );
}

export default Home;
