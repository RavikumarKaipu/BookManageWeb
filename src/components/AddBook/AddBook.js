import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import axios from 'axios';
import './AddBook.css';

const AddEditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    Title: '',
    Author: '',
    Genre: '',
    Pages: '',
    PublishedDate: ''
  });

  useEffect(() => {
    const token = Cookies.get('jwt_token'); // Assuming you stored the token in localStorage

    if (id) {
      axios.get(`http://localhost:5000/books/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in request header
        }
      })
        .then(response => {
          setBook(response.data); // Set book data when editing
        })
        .catch(error => {
          console.error('Error fetching book:', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const token = Cookies.get('jwt_token');
  const method = id ? 'put' : 'post';
  const url = id ? `http://localhost:5000/books/${id}` : 'http://localhost:5000/books';

  axios[method](url, book, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      navigate('/', { replace: true });
      alert('Book saved');
    })
    .catch(error => {
      console.error('Error saving book:', error.response?.data || error.message); 
      alert('Error saving book, please try again.');
    });
};

  return (
    <div className="add-edit-book">
      <h2>{id ? 'Edit Book' : 'Add New Book'}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="Title" 
          value={book.Title} 
          onChange={handleChange} 
          placeholder="Title" 
          required 
        />
        <input 
          type="text" 
          name="Author" 
          value={book.Author} 
          onChange={handleChange} 
          placeholder="Author" 
          required 
        />
        <input 
          type="text" 
          name="Genre" 
          value={book.Genre} 
          onChange={handleChange} 
          placeholder="Genre" 
          required 
        />
        <input 
          type="number" 
          name="Pages" 
          value={book.Pages} 
          onChange={handleChange} 
          placeholder="Pages" 
          min="0" 
          required 
        />
        <input 
          type="date" 
          name="PublishedDate" 
          value={book.PublishedDate} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Save Book</button>
      </form>
      <h4 style={{textAlign: "center"}}>or</h4>
      <button onClick={() => navigate('/', { replace: true })}>Back to Home</button>
    </div>
  );
};

export default AddEditBook;
