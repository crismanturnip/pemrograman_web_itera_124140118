import PropTypes from 'prop-types';
import './BookFilter.css';

function BookFilter({ searchTerm, statusFilter, onSearchChange, onStatusChange }) {
  return (
    <div className="book-filter">
      <div className="filter-field search-field">
        <label htmlFor="search">Cari buku</label>
        <input
          id="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="judul atau penulis..."
        />
      </div>
      <div className="filter-field">
        <label htmlFor="filter-status">Filter status</label>
        <select
          id="filter-status"
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <option value="semua">Semua</option>
          <option value="milik">Milik</option>
          <option value="baca">Sedang dibaca</option>
          <option value="beli">Ingin dibeli</option>
        </select>
      </div>
    </div>
  );
}

BookFilter.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  statusFilter: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default BookFilter;
