import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/books/${id}`)
      .then(response => setBook(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/books/${id}`)
      .then(() => {
        navigate('/books-list',{replace:true});
      })
      .catch(error => console.error(error));
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="book-details">
      <h2>Book Details</h2>
      <p><strong>Title:</strong> {book.Title}</p>
      <p><strong>Author:</strong> {book.Author}</p>
      <p><strong>Genre:</strong> {book.Genre}</p>
      <p><strong>Pages:</strong> {book.Pages}</p>
      <p><strong>Published Date:</strong> {book.PublishedDate}</p>
      <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => navigate('/books-list',{replace:true})}>Back to List</button>
      
    </div>
  );
};

export default BookDetails;
