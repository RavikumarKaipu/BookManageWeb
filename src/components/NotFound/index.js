import React from 'react';
import './NotFound.css';

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
      alt="not-found"
      className="not-found-img"
    />
    <h2 className="not-found-heading">Page Not Found</h2>
    <p className="not-found-text">Sorry, the page you’re looking for doesn’t exist.</p>
  </div>
);

export default NotFound;