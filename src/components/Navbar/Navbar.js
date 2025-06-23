
import { Link, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import { useContext } from 'react';
 // Import ThemeContext
import './Navbar.css';
import { ThemeContext } from '../Themecontext/ThemeContext';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);  // Use context to get theme state
  const navigate = useNavigate();
  const userName=localStorage.getItem('user')

  const validUser=userName==='ravi'?true:false
  
  const onLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
  };

  const toHome = () => {
    navigate('/');
  };

  const toAddBook = () => {
    navigate('/add-book');
  };

  const toBookList = () => {
    navigate('/books-list');
  };

  const toContact = () => {
    navigate('/contact');
  };

  const toAbout = () => {
    navigate('/about');
  };

  return (
    <nav className={isDarkMode ? 'dark-nav' : 'light-nav'}>
      <ul className="navbar-list">
        <li onClick={toHome}><Link>Home</Link></li>
        <li onClick={toAddBook}><Link>Add Book</Link></li>
        <li onClick={toBookList}><Link>Books List</Link></li>
        <li onClick={toContact}><Link>Contact</Link></li>
        <li onClick={toAbout}><Link>About</Link></li>
        {validUser?<li><Link to='/users-list'>Users</Link></li>:null}
        <li onClick={onLogout} className="logout-mobile-btn">
          <Link>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
              alt="logout icon"
              className="logout-icon"
            />
          </Link>
        </li>
        {/* Dark/Light theme toggle button */}
        <li style={{'textDecoration':'none'}} className={isDarkMode ?'dark-theme-toggle-btn':"theme-toggle-btn"} onClick={toggleTheme} >
            <Link>{isDarkMode ? '🌙' : '☀️'}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
