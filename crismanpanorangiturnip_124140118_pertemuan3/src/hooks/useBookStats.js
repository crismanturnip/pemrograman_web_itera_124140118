import { useMemo } from 'react';

// Statistik diturunkan dari data buku agar tidak perlu disimpan sebagai state terpisah.
function useBookStats(books) {
  return useMemo(() => {
    const total = books.length;
    const owned = books.filter((book) => book.status === 'milik').length;
    const reading = books.filter((book) => book.status === 'baca').length;
    const wishlist = books.filter((book) => book.status === 'beli').length;

    return { total, owned, reading, wishlist };
  }, [books]);
}

export default useBookStats;
