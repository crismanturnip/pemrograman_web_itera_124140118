import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const linkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <NavLink to="/" className="brand">Rak Buku</NavLink>
        <div className="nav-links">
          <NavLink to="/" className={linkClass}>Beranda</NavLink>
          <NavLink to="/stats" className={linkClass}>Statistik</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
