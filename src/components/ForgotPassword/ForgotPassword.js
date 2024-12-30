import React, { useState } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';

import './Forgot.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const navigate = useNavigate();

  const validatePassword = (password) => {
    // Regular expression to validate password
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleVerifyEmail = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/verify-email', { email });

      setMessage(response.data.message);
      setMessageColor('green');
      setEmailVerified(true);
    } catch (error) {
      setMessage(error.response ? error.response.data.error : 'Invalid email or user not found');
      setMessageColor('red');
    }
  };

  const handleSendOtp = async () => {
    try {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000);

      const templateParams = {
        to_email: email,
        subject: 'Password Reset OTP',
        message: `${generatedOtp}`,
      };

      const result = await emailjs.send(
        'service_a9hd7rt',
        'template_mu0oixa',
        templateParams,
        'esr4ShFopo33Bq83A'
      );

      console.log(result);
      setMessage('OTP sent successfully!');
      setOtpSent(true);

      localStorage.setItem('otp', generatedOtp);
    } catch (error) {
      setMessage('Failed to send OTP.');
      console.error(error);
    }
  };

  const handleVerifyOtp = () => {
    const storedOtp = localStorage.getItem('otp');

    if (otp === storedOtp) {
      setMessage('OTP verified successfully!');
      setOtpVerified(true);
    } else {
      setMessage('Invalid OTP');
    }
  };

  const handleUpdatePassword = async () => {
    // Check password validity first
    if (!validatePassword(newPassword)) {
      setMessage(
        'Password must be at least 8 characters long, include at least one number, and one special character.'
      );
      setMessageColor('red');
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match!');
      setMessageColor('red');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/update-password', {
        email,
        newPassword,
      });

      setMessage(response.data.message);
      setMessageColor('green');
      navigate('/login');
    } catch (error) {
      setMessage(error.response ? error.response.data.error : 'An error occurred');
      setMessageColor('red');
    }
  };

  return (
    <div className="forgot-main-container">
      <section className="forgot-section1">
        <div className="forgot-signin">
          <div className="forgot-content">
            <h2>Forgot Password</h2>
            <div className="forgot-form">
              {!emailVerified && (
                <div className="forgot-inputBox">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <i>Email</i>
                  <button onClick={handleVerifyEmail}>Verify Email</button>
                </div>
              )}

              {emailVerified && !otpSent && (
                <div className="forgot-inputBox">
                  <button onClick={handleSendOtp}>Send OTP</button>
                </div>
              )}

              {otpSent && !otpVerified && (
                <div className="forgot-inputBox">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                  <i>OTP</i>
                  <button onClick={handleVerifyOtp}>Verify OTP</button>
                </div>
              )}

              {otpVerified && (
                <>
                  <div className="forgot-inputBox">
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <i>New Password</i>
                  </div>
                  <div className="forgot-inputBox">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <i>Confirm Password</i>
                  </div>
                  <button onClick={handleUpdatePassword}>Update Password</button>
                </>
              )}

              {message && <p style={{ color: messageColor }} className="error-message">{message}</p>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
