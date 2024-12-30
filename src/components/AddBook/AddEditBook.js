import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddBook.css';

const AddEditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ Title: '', Author: '', Genre: '', Description: '' });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/books/${id}`)
        .then(response => setBook(response.data))
        .catch(error => console.log(error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id 
      ? axios.put(`http://localhost:5000/books/${id}`, book) 
      : axios.post(`http://localhost:5000/books`, book);

    request
      .then(() => {
        alert('Book saved successfully!');
        navigate('/books-list');
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="add-book">
      <h2>{id ? "Edit Book" : "Add Book"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input name="Title" value={book.Title} onChange={handleChange} required />

        <label>Author:</label>
        <input name="Author" value={book.Author} onChange={handleChange} required />

        <label>Genre:</label>
        <input name="Genre" value={book.Genre} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="Description" value={book.Description} onChange={handleChange}></textarea>

        <button type="submit">{id ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default AddEditBook;
