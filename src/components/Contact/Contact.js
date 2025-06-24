import React, { useState, useEffect } from 'react';
import '../About/About.css';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const Contact = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail'); // Replace with your auth logic
    if (userEmail) {
      setFormData((prev) => ({
        ...prev,
        email: userEmail
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent email field from being editable
    if (name === "email") return;

    setFormData({
      ...formData,
      [name]: value
    });

    if (name === "email" && !validateEmail(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    emailjs
      .send(
        'service_a9hd7rt',
        'template_l6rgypp',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'esr4ShFopo33Bq83A'
      )
      .then(
        (result) => {
          alert('Message sent successfully!');
          setFormData((prev) => ({
            ...prev,
            name: '',
            message: ''
            // email not cleared
          }));
        },
        (error) => {
          alert('Failed to send message. Please try again.');
        }
      );
  };

  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <p>If you have any questions, feel free to reach out to us!</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          readOnly style={{cursor:'not-allowed'}}
        />
        {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
      <button onClick={() => navigate('/', { replace: true })}>Back to Home</button>
    </div>
  );
};

export default Contact;