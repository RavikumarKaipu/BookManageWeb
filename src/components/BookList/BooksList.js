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

       