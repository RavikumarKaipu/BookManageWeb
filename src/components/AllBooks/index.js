import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import '../BookList/BooksList.css';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllBooks = async () => {
      const token = Cookies.get('jwt_token');
      try {
        const response = await axios.get('https://bookmanage-backend.vercel.app/allbooks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBooks(response.data);
      } catch (err) {
        console.error('Error fetching all books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBooks();
  }, []);

  return (
    <div className="books-list">
      <Navbar />
      <h1>All Books (Admin View)</h1>
      {loading ? (
        <div className="loader-wrapper">
          <div className="loader"></div>
          <p>Loading all books...</p>
        </div>
      ) : books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="books-container">
          {books.map(book => (
            <div key={book._id} className="book-item">
              <h3>{book.Title}</h3>
              <p><strong>Author:</strong> {book.Author}</p>
              <p><strong>Genre:</strong> {book.Genre}</p>
              <Link to={`/book-details/${book._id}`}>
                <button>View</button>
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

export default AllBooks;
