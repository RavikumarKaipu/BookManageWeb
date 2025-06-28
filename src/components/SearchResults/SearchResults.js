import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = () => {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query') || '';
  const genreFilter = queryParams.get('genre') || '';

  useEffect(() => {
    setLoading(true);
    axios.get(`https://bookmanage-backend.vercel.app/books?page=${currentPage}`)
      .then(response => {
        let filtered = response.data;

        if (searchQuery) {
          filtered = filtered.filter(book =>
            book.Title.toLowerCase().includes(searchQuery.toLowerCase())
          );  
        }

        if (genreFilter) {
          filtered = filtered.filter(book =>
            book.Genre.toLowerCase().includes(genreFilter.toLowerCase())
          );
        }

        setFilteredBooks(filtered);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, [currentPage, searchQuery, genreFilter]);

  const handleDelete = (bookID) => {
    axios.delete(`https://bookmanage-backend.vercel.app/books/${bookID}`)
      .then(() => {
        const updatedBooks = filteredBooks.filter(book => book._id !== bookID);
        setFilteredBooks(updatedBooks);
        alert('Book deleted successfully!');
        navigate('/books-list');
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="search-results">
      <h2>Search Results</h2>

      {loading ? (
        <div className="loading-wrapper">
          <div className="loader"></div>
          <p className="loading-text">Loading books...</p>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="no-results-wrapper">
          <p className="no-results">📚 No books found matching your search.</p>
        </div>
      ) : (
        <div className="book-list">
          {filteredBooks.map(book => (
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
        <button onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </div>
  );
};

export default SearchResults;