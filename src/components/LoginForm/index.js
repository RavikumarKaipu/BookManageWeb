import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'js-cookie';
import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  // ✅ Handle successful login
  const onSubmitSuccess = ({ token, username, isAdmin,email }) => {
    Cookies.set('jwt_token', token, { expiresIn: '30d' });
    localStorage.setItem('user', username || '');
    localStorage.setItem('userEmail',email)
    localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false');
    navigate('/');
  };

  // ❌ Handle error
  const onSubmitFailure = msg => {
    setShowSubmitError(true);
    setErrorMsg(msg);
  };

  // 🔐 Submit form to backend
  const submitForm = async event => {
    event.preventDefault();

    try {
      const response = await axios.post('https://bookmanage-backend.vercel.app/api/login',{
        username,
        password
      })


      if (response.status===200) {
        onSubmitSuccess(response.data);
      } else {
        onSubmitFailure(response.error || 'Invalid credentials');
      }
    } catch (error) {
      onSubmitFailure('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-form-container">
      <img
        src="https://media.licdn.com/dms/image/v2/D5612AQFDzBbRWspm1A/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1693454031927?e=2147483647&v=beta&t=Q5jbPMu1D6_zR0zlelZknhu-qtzdZmFw3sssfG--I58"
        className="login-website-logo-mobile-image"
        alt="website logo"
      />
      <img
        src="https://media.licdn.com/dms/image/v2/D5612AQFDzBbRWspm1A/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1693454031927?e=2147483647&v=beta&t=Q5jbPMu1D6_zR0zlelZknhu-qtzdZmFw3sssfG--I58"
        className="login-image"
        alt="website login"
      />

      <form className="form-container" onSubmit={submitForm}>
        <img
          src="https://rickkettner.com/wp-content/uploads/2020/12/Best-Management-Books.jpg"
          className="login-website-logo-desktop-image"
          alt="website logo"
        />

        <div className="input-container">
          <label className="input-label" htmlFor="username">USERNAME</label>
          <input
            type="text"
            id="username"
            className="username-input-field"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <label className="input-label" htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            className="password-input-field"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">Login</button>

        <p className="forgot-password"><Link to="/forgotPassword">Forgot Password?</Link></p>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}

        <p className="or-text">or</p>
        <p className="no-account-text">You don't have an account?</p>
        <Link to="/signup"><button type="button" className="signup-button">Sign Up</button></Link>
      </form>
    </div>
  );
};

export default LoginForm;
