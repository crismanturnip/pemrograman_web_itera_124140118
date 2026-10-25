import { fireEvent, render, screen } from '@testing-library/react';
import BookCard from './BookCard';

const dummyBook = {
  id: 1,
  title: 'Laskar Pelangi',
  author: 'Andrea Hirata',
  status: 'milik',
};

describe('BookCard', () => {
  test('menampilkan judul dan penulis buku', () => {
    render(<BookCard book={dummyBook} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
    expect(screen.getByText('oleh Andrea Hirata')).toBeInTheDocument();
  });

  test('menampilkan label status', () => {
    render(<BookCard book={dummyBook} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Milik')).toBeInTheDocument();
  });

  test('memanggil onEdit saat tombol edit diklik', () => {
    const onEdit = vi.fn();
    render(<BookCard book={dummyBook} onEdit={onEdit} onDelete={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    expect(onEdit).toHaveBeenCalledWith(dummyBook);
  });

  test('memanggil onDelete dengan id buku', () => {
    const onDelete = vi.fn();
    render(<BookCard book={dummyBook} onEdit={vi.fn()} onDelete={onDelete} />);
    fireEvent.click(screen.getByRole('button', { name: 'Hapus' }));
    expect(onDelete).toHaveBeenCalledWith(1);
  });
});
