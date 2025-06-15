<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BooksList.css';
import Navbar from '../Navbar/Navbar';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div className="books-list">
      <Navbar/>
      <h1>Books List</h1>
      <Link to="/add-book" className="add-btn">Add New Book</Link>
      
      <div className="books-container">
        {books.map((book) => (
          <div key={book.BookID} className="book-item">
            <h3>{book.Title}</h3>
            <p><strong>Author:</strong> {book.Author}</p>
            <Link to={`/book/${book.BookID}`}>View Details</Link>
          </div>
          
          
        ))}
        
      </div>
      <button onClick={() => navigate('/',{replace:true})}>Back to Home</button>
      
    </div>
    
  );
};

export default BooksList;
=======
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './BooksList.css';
import Navbar from '../Navbar/Navbar';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    if (!navigator.onLine) {
      setErrorMessage('⚠️ No internet connection. Please check your network.');
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, 7000); // ⏱️ Timeout after 7 seconds

    try {
      const response = await axios.get('https://bookmanage-backend.vercel.app/books', {
        signal: controller.signal,
      });
      setBooks(response.data);
    } catch (error) {
      if (error.code === 'ERR_CANCELED') {
        setErrorMessage('⏳ Request timed out. Please try again.');
      } else {
        setErrorMessage('❌ Failed to load books. Try again later.');
      }
      console.error("Error fetching books:", error);
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  };

  return (
    <div className="books-list">
      <Navbar />
      <h1>Books List</h1>
      <Link to="/add-book" className="add-btn">Add New Book</Link>

      {loading ? (
        <div className="loader-wrapper">
          <div className="loader"></div>
          <p>Loading books...</p>
        </div>
      ) : errorMessage ? (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      ) : (
        <div className="books-container">
          {books.length === 0 ? (
            <p>No books found. Add some!</p>
          ) : (
            books.map((book) => (
              <div key={book._id} className="book-item">
                <h3>{book.Title}</h3>
                <p><strong>Author:</strong> {book.Author}</p>
                <Link to={`/books/${book._id}`}>View Details</Link>
              </div>
            ))
          )}
        </div>
      )}

      <button onClick={() => navigate('/', { replace: true })}>Back to Home</button>
    </div>
  );
};

export default BooksList;
>>>>>>> 8b55888 (Remove node_modules from repo)
