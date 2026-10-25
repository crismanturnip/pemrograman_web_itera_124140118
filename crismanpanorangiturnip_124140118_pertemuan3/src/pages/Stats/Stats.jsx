import Header from '../../components/Header/Header';
import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';
import './Stats.css';

function Stats() {
  const { books } = useBooks();
  const stats = useBookStats(books);

  const cards = [
    ['Total buku', stats.total],
    ['Milik', stats.owned],
    ['Sedang dibaca', stats.reading],
    ['Ingin dibeli', stats.wishlist],
  ];

  return (
    <>
      <Header title="Statistik Buku" description="Ringkasan koleksi berdasarkan status buku." />
      <main className="page-container page-section stats-grid">
        {cards.map(([label, value]) => (
          <article className="stat-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </main>
    </>
  );
}

export default Stats;
