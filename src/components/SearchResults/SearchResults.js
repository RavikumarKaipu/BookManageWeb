import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation  } from 'react-router-dom';
import './SearchResults.css'


const SearchResults = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query') || '';
  const genreFilter = queryParams.get('genre') || '';
  const navigate=useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:5000/books?page=${currentPage}`)
      .then(response => {
        let filteredBooks = response.data;
        if (searchQuery) {
          filteredBooks = filteredBooks.filter(book => 
            book.Title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        if (genreFilter) {
          filteredBooks = filteredBooks.filter(book => 
            book.Genre.toLowerCase() === genreFilter.toLowerCase()
          );
        }
        setBooks(filteredBooks);
      })
      .catch(error => console.log(error));
  }, [currentPage, searchQuery, genreFilter]);

  const handleDelete = (bookID) => {
    axios.delete(`http://localhost:5000/books/${bookID}`)
      .then(() => {
        setBooks(books.filter(book => book.BookID !== bookID));
        alert('Book deleted successfully!');
        navigate('/books-list')
      })
      .catch(error => console.log(error));
  };



  return (
    <div className="search-results">
      <h2>Search Results</h2>
      <div className="book-list">
        {books.map(book => (
          <div key={book.BookID} className="book-item">
            <h3>{book.Title}</h3>
            <p>Author: {book.Author}</p>
            <p>Genre: {book.Genre}</p>
            <Link to={`/book-details/${book.BookID}`}>
              <button>View Details</button>
            </Link>
            <Link to={`/edit/${book.BookID}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(book.BookID)}>Delete</button>
            
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1}>Previous</button>
        <button onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
      
    </div>
  );
  
};

export default SearchResults;
