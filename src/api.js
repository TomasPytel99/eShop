import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', 
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    //Authorization: `Bearer ${localStorage.getItem('token')}`, // Save the token locally

},
});

export default api;