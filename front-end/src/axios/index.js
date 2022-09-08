import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://softeo-api-123.herokuapp.com',
});

export default instance;