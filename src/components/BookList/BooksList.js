import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './BooksList.css';
import Navbar from '../Navbar/Navbar';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setErrorMessage('');

      if (!navigator.onLine) {
        setErrorMessage('⚠️ No internet connection. Please check your network.');
        setLoading(false);
        return;
      }

      const token = Cookies.get('jwt_token');
      const url = isAdmin
        ? 'https://bookmanage-backend.vercel.app/allbooks'
        : 'https://bookmanage-backend.vercel.app/books';

      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // 🛠 Extract books properly from response
        const fetchedBooks = isAdmin ? response.data : response.data.books;
        setBooks(fetchedBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
        setErrorMessage('❌ Failed to load books. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [isAdmin]);

  return (
    <div className="books-list">
      <Navbar />
      <h1>Books List</h1>
      <Link to="/add-book" className="add-btn">+ Add New Book</Link>

      {loading ? (
        <div className="loader-wrapper">
          <div className="loader"></div>
          <p>Loading books...</p>
        </div>
      ) : errorMessage ? (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      ) : books.length === 0 ? (
        <p className="no-books">No books found. Add some!</p>
      ) : (
        <div className="books-container">
          {books.map((book) => (
            <div key={book._id} className="book-item">
              <h3>{book.Title}</h3>
              <p><strong>Author:</strong> {book.Author}</p>
              <p><strong>Genre:</strong> {book.Genre}</p>
              <Link to={`/book-details/${book._id}`}>
                <button>View Details</button>
              </Link>
              <Link to={`/edit/${book._id}`}>
                <button>Edit</button>
              </Link>
            </div>
          ))}
        </div>
      )}

      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default BooksList;
