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

  // Fetch the existing book details if editing
  useEffect(() => {
    const token = Cookies.get('jwt_token');

    if (id) {
      axios.get(`https://bookmanage-backend.vercel.app/books/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in request header
        }
      })
        .then(response => {
          setBook(response.data); 
        })
        .catch(error => {
          console.error('Error fetching book:', error);
        });
    }
  }, [id,navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const token = Cookies.get('jwt_token');
    
    const method = id ? 'put' : 'post';
    const url = id ? `https://bookmanage-backend.vercel.app/books/${id}` : 'https://bookmanage-backend.vercel.app/books';
    
  try {
       await axios[method](url, book, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      alert('Book saved successfully.');
      navigate('/', { replace: true });
  }catch (error) {
      console.error('Error saving book:', error.response?.data || error.message);
      alert(`Error saving book: ${error.response?.data?.error || error.message}`);
    }
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
        <button type="submit">{id ? 'Update Book' : 'Save Book'}</button>
      </form>
      <h4 style={{textAlign: "center"}}>or</h4>
      <button onClick={() => navigate('/', { replace: true })}>Back to Home</button>
    </div>
  );
};

export default AddEditBook;