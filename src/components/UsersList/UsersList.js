<<<<<<< HEAD
import React, { useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import './UsersList.css'; // Add this CSS file for styling
import { Link } from 'react-router-dom';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const fetchUsers = async () => {
    
    const token = Cookies.get('jwt_token');
    if (!token) {
      setError('No token provided');
      return;
    }
  
    try {
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
        params: { username: credentials.username, password: credentials.password },
      });
      setUsers(response.data?.users || []); // Use a fallback to an empty array
      setError('');
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
      setUsers([]); // Ensure users is reset to an empty array on error
    }
  };
  

  // Handle submit credentials
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleDelete = async (id) => {
    const token = Cookies.get('jwt_token');
    if (!token) {
      setError('No token provided');
      return;
    }

    try {
      // Send DELETE request to server with user ID
      const response = await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Include JWT token
        }
      });
      const res=response
      console.log(res)
      // On success, remove the user from local state
      setUsers(users.filter(user => user.id !== id));
      setError('');
    } catch (error) {
      setError(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  return (
    <div className="users-list">
      <h2>Users List</h2>
      
      {/* Form for entering credentials */}
      <form className='user-form' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
        <button type="submit">Get Users</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="user-details">
        {users.length > 0 ? (
          <table className='user-table'>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.created_at).toLocaleString()}</td>
                  {user.username==='ravi'?<td>Admin</td>:<td><button className='delete-button' onClick={() => handleDelete(user.id)}>Delete</button></td>}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h3>No users found!! :(</h3>
        )}
      </div>
      <button><Link to='/'>Home</Link></button>
    </div>
  );
};

export default UsersList;
=======
import React, {  useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './UsersList.css';
import { Link } from 'react-router-dom';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    const token = Cookies.get('jwt_token');
    if (!token) {
      setError('No token provided');
      return;
    }

    try {
      const response = await axios.get('https://bookmanage-backend.vercel.app/users',{
        headers: { Authorization: `Bearer ${token}`}
      });
      console.log(response)
      if(response.status===200){
        setUsers(response.data);
        setError('');
      }

    } catch (error) {
      setError(error.response?.data?.error || 'Access denied or other error');
      setUsers([]);
    }
  };

  const handleDelete = async (id) => {
    const confirmation =window.confirm('Are you want delete User!')
    const token = Cookies.get('jwt_token');
    if (!token ) {
      setError('No token provided');
      return;
    }

    if(confirmation){
    try {
      await axios.delete(`https://bookmanage-backend.vercel.app/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(users.filter(user => user._id !== id));
      setError('');
    } catch (error) {
      setError(error.response ? error.response.data.error : 'An error occurred');
    }
  }
  };

  return (
    <div className="users-list">
      <h2>Users List (Admin Only)</h2>
      
      <button onClick={fetchUsers}>Load Users</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="user-details">
        {users.length > 0 ? (
          <table className="user-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td>
                    {user.username === 'Ravi_9392' ? 'Admin' : (
                      <button className="delete-button" onClick={() => handleDelete(user._id)}>Delete</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h3>No users found!! :(</h3>
        )}
      </div>
      <button><Link to='/'>Home</Link></button>
    </div>
  );
};

export default UsersList;
>>>>>>> 8b55888 (Remove node_modules from repo)
