import { fireEvent, render, screen } from '@testing-library/react';
import BookForm from './BookForm';

describe('BookForm', () => {
  test('menampilkan error ketika judul dan penulis kosong', () => {
    render(<BookForm onSubmit={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Tambah buku' }));
    expect(screen.getByText('Judul buku wajib diisi.')).toBeInTheDocument();
    expect(screen.getByText('Nama penulis wajib diisi.')).toBeInTheDocument();
  });

  test('mengirim data form yang valid', () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText('Judul buku'), { target: { value: 'Bumi' } });
    fireEvent.change(screen.getByLabelText('Penulis'), { target: { value: 'Tere Liye' } });
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'baca' } });
    fireEvent.click(screen.getByRole('button', { name: 'Tambah buku' }));
    expect(onSubmit).toHaveBeenCalledWith({ title: 'Bumi', author: 'Tere Liye', status: 'baca' });
  });

  test('mengisi form dengan data buku saat mode edit', () => {
    const book = { id: 2, title: 'Atomic Habits', author: 'James Clear', status: 'milik' };
    render(<BookForm initialBook={book} onSubmit={vi.fn()} />);
    expect(screen.getByLabelText('Judul buku')).toHaveValue('Atomic Habits');
    expect(screen.getByLabelText('Penulis')).toHaveValue('James Clear');
    expect(screen.getByRole('button', { name: 'Simpan perubahan' })).toBeInTheDocument();
  });

  test('memanggil onCancel pada mode edit', () => {
    const onCancel = vi.fn();
    const book = { id: 2, title: 'Atomic Habits', author: 'James Clear', status: 'milik' };
    render(<BookForm initialBook={book} onSubmit={vi.fn()} onCancel={onCancel} />);
    fireEvent.click(screen.getByRole('button', { name: 'Batal' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
