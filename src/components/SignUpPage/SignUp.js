import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './SignUp.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validatePassword(formData.password)) {
      setMessage(
        'Password must be at least 8 characters long, include at least one number, and one special character.'
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('https://bookmanage-backend.vercel.app/api/signup', {
        username: formData.username,
        password: formData.password,
        email: formData.email,
      });

      setMessage(response.data.message);
      
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      setMessage(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="body1">
        <section className="section1">
          {Array(200).fill().map((_, i) => (
            <span key={i}></span>
          ))}
          <div className="signin">
            <div className="content">
              <h2>Sign Up</h2>
              <div className="form">
                {/* Username */}
                <div className="inputBox">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  <i>Username</i>
                </div>

                {/* Email */}
                <div className="inputBox">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <i>Email</i>
                </div>

                {/* Password */}
                <div className="inputBox">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <i>Password</i>
                </div>

                {/* Confirm Password */}
                <div className="inputBox">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <i>Confirm Password</i>
                </div>

                {/* Submit Button */}
                <div className="inputBox">
                  <input type="submit" value="Sign Up" />
                </div>
                {message && <p className="error-message">{message}</p>}

                {/* Login Link */}
                <div className="links">
                  <h3>
                    Already have an account? <Link to="/login">Login</Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </form>
  );
};

export default Signup;