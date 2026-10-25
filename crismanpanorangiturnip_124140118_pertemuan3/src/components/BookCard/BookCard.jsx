import PropTypes from 'prop-types';
import './BookCard.css';

const statusLabels = {
  milik: 'Milik',
  baca: 'Sedang dibaca',
  beli: 'Ingin dibeli',
};

function BookCard({ book, onEdit, onDelete }) {
  return (
    <article className="book-card">
      <div>
        <span className={`status-badge status-${book.status}`}>{statusLabels[book.status]}</span>
        <h3>{book.title}</h3>
        <p>oleh {book.author}</p>
      </div>
      <div className="book-actions">
        <button className="edit-btn" onClick={() => onEdit(book)} type="button">Edit</button>
        <button className="delete-btn" onClick={() => onDelete(book.id)} type="button">Hapus</button>
      </div>
    </article>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookCard;
