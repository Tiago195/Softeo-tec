import axios from 'axios';
// import 'dotenv/config';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
});

export default instance;