import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import BooksList from './components/BookList/BooksList';
import BookDetails from './components/BookDetails/BookDetails';
import AddBook from './components/AddBook/AddBook';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import SearchResults from './components/SearchResults/SearchResults';
import AddEditBook from './components/AddBook/AddBook';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import Signup from './components/SignUpPage/SignUp';
import UsersList from './components/UsersList/UsersList'
import LoginForm from './components/LoginForm';
import { ThemeProvider } from './components/Themecontext/ThemeContext';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import NoConnection from './components/NoConnection/NoConnection';

import './App.css';
import NotFound from './components/NotFound';
import AllBooks from './components/AllBooks';

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const updateTitle = () => {
      const jwt = Cookies.get('jwt_token');
      const title = jwt ? 'BookManagement' : 'Login';
      document.title = title;
    };
    updateTitle();
    const interval = setInterval(updateTitle, 500); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleNetworkChange = () => {
      setIsOnline(navigator.onLine);
    };
    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);
    return () => {
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
    };
  }, []);

  if (!isOnline) {
    return <NoConnection />;
  }

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/allbooks" element={<ProtectedRoute element={<AllBooks />} />} />
          <Route path='/forgotPassword' element={<ForgotPassword/>}/>
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route exact path="/login" element={<LoginForm/>} />
          <Route path="/books-list" element={<ProtectedRoute element={<BooksList />} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/books/:id" element={<ProtectedRoute element={<BookDetails />} />} />
          <Route path="/add-book" element={<ProtectedRoute element={<AddBook />} />} />
          <Route path="/edit/:id" element={<ProtectedRoute element={<AddEditBook />} />} />
          <Route path="/contact" element={<ProtectedRoute element={<Contact />} />} />
          <Route path="/about" element={<ProtectedRoute element={<About />} />} />
          <Route path="/search-results" element={<ProtectedRoute element={<SearchResults />} />} />
          <Route path="/book-details/:id" element={<ProtectedRoute element={<BookDetails />} />} />
          <Route path='/allbooks' element={<ProtectedRoute element={<BooksList/>}/>}/>
          <Route path="/users-list" element={<ProtectedRoute element={<UsersList />} />} />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
