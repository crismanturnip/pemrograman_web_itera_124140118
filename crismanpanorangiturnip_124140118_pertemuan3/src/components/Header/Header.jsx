import PropTypes from 'prop-types';
import './Header.css';

function Header({ title, description = '' }) {
  return (
    <header className="page-header">
      <div className="page-container">
        <p className="eyebrow">personal library</p>
        <h1>{title}</h1>
        {description && <p className="header-description">{description}</p>}
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default Header;
