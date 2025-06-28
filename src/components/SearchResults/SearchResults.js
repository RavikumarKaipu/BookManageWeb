import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query') || '';
  const genreFilter = queryParams.get('genre') || '';
  const token = Cookies.get('jwt_token');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await axios.get(`https://bookmanage-backend.vercel.app/books`, {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            query: searchQuery,
            genre: genreFilter,
            page: currentPage,
            limit: 6
          }
        });

        setBooks(response.data.books || []);
        setTotalPages(response.data.totalPages || 1);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError('Failed to fetch books. Please try again.');
        console.error(err);
      }
    };

    fetchBooks();
  }, [currentPage, searchQuery, genreFilter, token]);

  const handleDelete = async (bookID) => {
    try {
      await axios.delete(`https://bookmanage-backend.vercel.app/books/${bookID}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks(prev => prev.filter(book => book._id !== bookID));
      alert('Book deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to delete book');
    }
  };

  return (
    <div className="search-results">
      <h2>Search Results</h2>

      {loading ? (
        <div className="loading-wrapper">
          <div className="loader"></div>
          <p className="loading-text">Loading books...</p>
        </div>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : books.length === 0 ? (
        <div className="no-results-wrapper">
          <p className="no-results">📚 No books found matching your search.</p>
        </div>
      ) : (
        <div className="book-list">
          {books.map(book => (
            <div key={book._id} className="book-item">
              <h3>{book.Title}</h3>
              <p>Author: {book.Author}</p>
              <p>Genre: {book.Genre}</p>
              <Link to={`/book-details/${book._id}`}>
                <button>View Details</button>
              </Link>
              <Link to={`/edit/${book._id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(book._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </div>
  );
};

export default SearchResults;
