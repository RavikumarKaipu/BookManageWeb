import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    Title: "",
    AuthorID: "",
    GenreID: "",
    Pages: "",
    PublishedDate: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/books`).then((response) => {
      const selectedBook = response.data.find((b) => b.BookID === parseInt(id));
      if (selectedBook) {
        setBook(selectedBook);
      }
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/books/${id}`, book).then(() => {
      alert("Book updated successfully.");
      navigate(`/book/${id}`,{replace:true});
    });
  };

  return (
    <div>
      <h1>Edit Book</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="Title"
            value={book.Title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Author ID</label>
          <input
            type="number"
            name="AuthorID"
            value={book.AuthorID}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Genre ID</label>
          <input
            type="number"
            name="GenreID"
            value={book.GenreID}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Pages</label>
          <input
            type="number"
            name="Pages"
            value={book.Pages}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Published Date</label>
          <input
            type="date"
            name="PublishedDate"
            value={book.PublishedDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
}

export default EditBook;
