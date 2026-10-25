import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './BookForm.css';

const emptyForm = { title: '', author: '', status: 'milik' };

function BookForm({ initialBook = null, onSubmit, onCancel = () => {} }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialBook) {
      setForm({
        title: initialBook.title,
        author: initialBook.author,
        status: initialBook.status,
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [initialBook]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (value.trim()) {
      setErrors((current) => ({ ...current, [name]: '' }));
    }
  };

  // Validasi sederhana untuk memberi feedback visual sebelum data disimpan.
  const validate = () => {
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = 'Judul buku wajib diisi.';
    if (!form.author.trim()) nextErrors.author = 'Nama penulis wajib diisi.';
    if (!form.status) nextErrors.status = 'Status buku wajib dipilih.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: form.title.trim(),
      author: form.author.trim(),
      status: form.status,
    });
    setForm(emptyForm);
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h2>{initialBook ? 'Edit Buku' : 'Tambah Buku'}</h2>

      <div className="form-group">
        <label htmlFor="title">Judul buku</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          className={errors.title ? 'input-error' : ''}
          placeholder="contoh: Laskar Pelangi"
        />
        {errors.title && <small className="error-text">{errors.title}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="author">Penulis</label>
        <input
          id="author"
          name="author"
          value={form.author}
          onChange={handleChange}
          className={errors.author ? 'input-error' : ''}
          placeholder="nama penulis"
        />
        {errors.author && <small className="error-text">{errors.author}</small>}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select id="status" name="status" value={form.status} onChange={handleChange}>
          <option value="milik">Milik</option>
          <option value="baca">Sedang dibaca</option>
          <option value="beli">Ingin dibeli</option>
        </select>
      </div>

      <div className="form-actions">
        <button className="primary-btn" type="submit">
          {initialBook ? 'Simpan perubahan' : 'Tambah buku'}
        </button>
        {initialBook && (
          <button className="secondary-btn" type="button" onClick={onCancel}>Batal</button>
        )}
      </div>
    </form>
  );
}

BookForm.propTypes = {
  initialBook: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export default BookForm;
