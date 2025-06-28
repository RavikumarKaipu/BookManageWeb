import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import './Navbar.css';
import { ThemeContext } from '../Themecontext/ThemeContext';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem('isAdmin') === 'true'; // ✅ Proper admin check

  const onLogout = () => {
    Cookies.remove('jwt_token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin'); 
    localStorage.removeItem('userEmail')// ✅ Clear admin status
    navigate('/login');
  };

  return (
    <nav className={isDarkMode ? 'dark-nav' : 'light-nav'}>
      <ul className="navbar-list">
  <li><Link to="/">Home</Link></li>
  <li><Link to="/add-book">Add Book</Link></li>
  {isAdmin && <li><Link to="/allbooks">All Books</Link></li>}
  <li><Link to="/books-list">Books List</Link></li>

  <li><Link to="/contact">Contact</Link></li>
  <li><Link to="/about">About</Link></li>
  {isAdmin && <li><Link to="/users-list">Users</Link></li>}

  <li onClick={onLogout} className="logout-mobile-btn">
    <Link>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
        alt="logout icon"
        className="logout-icon"
      />
    </Link>
  </li>

  <li
    className={isDarkMode ? 'dark-theme-toggle-btn' : 'theme-toggle-btn'}
    onClick={toggleTheme}
  >
    <Link>{isDarkMode ? '🌙' : '☀️'}</Link>
  </li>
</ul>

    </nav>
  );
};

export default Navbar;