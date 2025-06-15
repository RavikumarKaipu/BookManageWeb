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
