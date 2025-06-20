import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

import './LoginForm.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 })
    localStorage.setItem('user', username)
    navigate('/')
  }

  const onSubmitFailure = (errorMessage) => {
    setShowSubmitError(true)
    setErrorMsg(errorMessage)
  }

  const submitForm = async (event) => {
    event.preventDefault()
    const userDetails = { username, password }

    try {
      const response = await axios.post('http://localhost:5000/api/login', userDetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Axios automatically throws error for non-2xx responses
      onSubmitSuccess(response.data.token)
    } catch (error) {
      if (error.response) {
        const message = error.response.data?.error || 'Invalid credentials'
        onSubmitFailure(message)
      } else {
        onSubmitFailure('Something went wrong. Please try again.')
      }
    }
  }

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
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">Login</button>

        <p className="forgot-password">
          <Link to="/forgotPassword">Forgot Password?</Link>
        </p>

        {showSubmitError && <p className="error-message">*{errorMsg}</p>}

        <p className="or-text">or</p>
        <p className="no-account-text">You don't have an account?</p>

        <Link to="/signup">
          <button type="button" className="signup-button">SignUp</button>
        </Link>
      </form>
    </div>
  )
}

export default LoginForm
