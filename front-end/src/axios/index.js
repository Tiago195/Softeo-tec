import axios from 'axios';
//https://softeo-api-123.herokuapp.com
const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

export default instance;